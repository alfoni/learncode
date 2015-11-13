import React from 'react';
import PlayButton from './SceneControls/PlayButton.js';
import RecordButton from './SceneControls/RecordButton.js';
import UploadButton from './SceneControls/UploadButton.js';
import styles from './SceneControls.css';
import {Mixin} from 'cerebral-react';
import Recorder from 'chrome-recorder';

// Need access to Cerebral controller, so using normal
// constructor
const SceneControls = React.createClass({
  contextTypes: {
    controller: React.PropTypes.object
  },
  mixins: [Mixin],
  componentWillMount() {
    this.isExecutingSignal = this.context.controller.store.isExecutingAsync();
  },
  componentDidMount() {
    this.recorder = new Recorder(this.refs.video, {
      audio: {
        sampleRate: 44000
      }
    });

    if (this.state.currentScene.recording) {
      this.loadAudioAndVideo();
    }
    this.context.controller.on('change', this.updateIsExecutingSignal);
  },
  componentDidUpdate(prevProps, prevState) {
    if (
      !prevState.recorder.isRecording &&
      prevState.recorder.isPlaying === this.state.recorder.isPlaying &&
      prevState.currentSeek !== this.state.course.currentSeek
    ) {
      // this.refs.video.currenTime = this.state.course.currentSeek[0];
      // this.refs.audio.currenTime = this.state.course.currentSeek[0];
    }
  },
  componentWillUnmount() {
    this.context.controller.removeListener('change', this.updateIsExecutingSignal);
  },
  recorder: null,
  isUploadReady: false,
  isRecording: false,
  isExecutingSignal: false,
  getStatePaths() {
    return {
      recorder: ['recorder'],
      course: ['course'],
      isAdmin: ['user', 'isAdmin']
    };
  },
  getComputedPaths() {
    return {
      currentScene: ['currentScene']
    };
  },
  updateIsExecutingSignal() {
    const forceUpdate = this.isExecutingSignal !== this.context.controller.store.isExecutingAsync();
    this.isExecutingSignal = this.context.controller.store.isExecutingAsync();

    if (forceUpdate) {
      this.forceUpdate();
    }
  },
  createMediaRequest(url) {
    return new Promise((resolve) => {
      const req = new XMLHttpRequest();
      req.open('GET', url, true);
      req.responseType = 'blob';

      req.onload = () => {
        resolve(req.response);
      };

      req.send();
    });
  },
  loadAudioAndVideo() {
    this.refs.video.addEventListener('canplaythrough', this.onCanPlayThrough);
    this.refs.video.addEventListener('waiting', this.onWaiting);
    this.refs.video.addEventListener('error', this.onError);
    this.refs.video.src = `/API/courses/${this.state.course.id}/scenes/${this.state.course.currentSceneIndex}/video`;
    this.refs.audio.src = `/API/courses/${this.state.course.id}/scenes/${this.state.course.currentSceneIndex}/audio`;
  },
  onCanPlayThrough() {
    if (this.state.course.isBuffering) {
      this.onPlayClick();
    } else {
      this.signals.course.mediaLoaded();
    }
  },
  onWaiting() {
    this.refs.video.pause();
    this.refs.audio.pause();
    this.signals.course.videoStartedBuffering({}, {
      isRecorded: true
    });
  },
  onError() {
    this.refs.video.pause();
    this.refs.audio.pause();
    this.signals.course.videoFailed({}, {
      isRecorded: true
    });
  },
  onRecordClick() {
    this.refs.video.removeEventListener('canplaythrough', this.onCanPlayThrough);
    this.refs.video.removeEventListener('waiting', this.onWaiting);
    this.isRecording = true;
    this.recorder.record(() => this.signals.course.recordClicked());
  },
  onStopClick() {
    this.isUploadReady = this.isRecording;
    this.isRecording = false;
    this.signals.course.stopClicked();
    setTimeout(() => {
      this.recorder.stop();
      const blobs = this.recorder.getBlobs();
      this.refs.video.src = window.URL.createObjectURL(blobs.video);
      this.refs.audio.src = window.URL.createObjectURL(blobs.audio);
    }, 250);
  },
  onPlayClick() {
    this.refs.video.play();
    this.refs.audio.play();
    this.signals.course.playClicked({
      seek: this.refs.video.currentTime * 1000
    });
  },
  onPauseClick() {
    this.refs.video.pause();
    this.refs.audio.pause();
    this.signals.course.pauseClicked({}, {
      isRecorded: true
    });
  },
  readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const fileInfo = {
        name: file.name,
        type: file.type,
        size: file.size,
        file: null
      };
      reader.onload = () => {
        fileInfo.file = new Uint8Array(reader.result);
        resolve(fileInfo);
      };
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsArrayBuffer(file);
    });
  },
  onUploadClick() {
    const blobs = this.recorder.getBlobs();
    this.signals.course.uploadClicked();
    Promise.all([
      this.readFile(blobs.audio),
      this.readFile(blobs.video)
    ])
    .then((files) => {
      const audio = files[0];
      const video = files[1];

      return Promise.all([
        fetch(`/API/courses/${this.state.course.id}/scenes/${this.state.course.currentSceneIndex}/audio`, {
          method: 'post',
          headers: {
            'Content-Type': audio.type,
            'Content-Length': audio.size
          },
          credentials: 'same-origin',
          body: audio.file
        }),
        fetch(`/API/courses/${this.state.course.id}/scenes/${this.state.course.currentSceneIndex}/video`, {
          method: 'post',
          headers: {
            'Content-Type': video.type,
            'Content-Length': video.size
          },
          credentials: 'same-origin',
          body: video.file
        })
      ])
      .catch(() => {
        this.signals.course.uploadFailed();
      });
    })
    .then((responses) => {
      // Have to force update due to uploadFinished might
      // not result in an actual state change
      this.isUploadReady = false;
      this.forceUpdate();

      if (responses[0].status === 200 && responses[1].status === 200) {
        this.signals.course.uploadFinished();
      } else {
        throw new Error('Upload failed');
      }
    })
    .catch(() => {
      this.signals.course.uploadFailed();
    });
  },
  render() {
    return (
      <div className={styles.wrapper}>
        <UploadButton
          isUploadReady={this.isUploadReady}
          recorder={this.state.recorder}
          onClick={() => this.onUploadClick()}
        />
        {
          this.state.isAdmin ?
            <RecordButton
              disabled={this.isExecutingSignal || this.state.course.isLoadingMedia}
              recorder={this.state.recorder}
              onRecordClick={() => this.onRecordClick()}
              onStopClick={() => this.onStopClick()}/>
          :
            null
        }
        <PlayButton
          disabled={this.isExecutingSignal || this.state.course.isLoadingMedia}
          recorder={this.state.recorder}
          onPlayClick={() => this.onPlayClick()}
          onPauseClick={() => this.onPauseClick()}/>
        <video ref="video" className={styles.frame}></video>
        <audio ref="audio"></audio>
      </div>
    );
  }
});

export default SceneControls;
