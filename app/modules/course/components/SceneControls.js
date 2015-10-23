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
    this.recorder = new Recorder(this.refs.video);

    if (this.state.currentScene.recording) {
      this.loadAudioAndVideo();
    }
    this.context.controller.on('change', this.updateIsExecutingSignal);
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
      course: ['course']
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
    Promise.all([
      this.createMediaRequest(`/API/courses/${this.state.course.id}/scenes/${this.state.course.currentSceneIndex}/audio`),
      this.createMediaRequest(`/API/courses/${this.state.course.id}/scenes/${this.state.course.currentSceneIndex}/video`)
    ])
    .then((media) => {
      const blobs = {
        audio: media[0],
        video: media[1]
      };
      this.recorder.setBlobs(blobs);
    });
  },
  onRecordClick() {
    this.isRecording = true;
    this.recorder.record(() => this.signals.course.recordClicked());
  },
  onStopClick() {
    this.isUploadReady = this.isRecording;
    this.isRecording = false;
    this.signals.course.stopClicked();
    setTimeout(() => {
      this.recorder.stop();
    }, 250);
  },
  onPlayClick() {
    this.recorder.seek(
      this.refs.video.currentTime * 1000 > 0 ? this.refs.video.currentTime * 1000 : 0,
      true,
      () => this.signals.course.playClicked({
        seek: this.refs.video.currentTime * 1000
      })
    );
  },
  onPauseClick() {
    this.recorder.pause();
    this.signals.course.pauseClicked();
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
          body: audio.file
        }),
        fetch(`/API/courses/${this.state.course.id}/scenes/${this.state.course.currentSceneIndex}/video`, {
          method: 'post',
          headers: {
            'Content-Type': video.type,
            'Content-Length': video.size
          },
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
          recorder={this.state.course.recorder}
          onClick={() => this.onUploadClick()}
        />
        <RecordButton
          isExecutingSignal={this.isExecutingSignal}
          recorder={this.state.course.recorder}
          onRecordClick={() => this.onRecordClick()}
          onStopClick={() => this.onStopClick()}/>
        <PlayButton
          isExecutingSignal={this.isExecutingSignal}
          recorder={this.state.course.recorder}
          onPlayClick={() => this.onPlayClick()}
          onPauseClick={() => this.onPauseClick()}/>
        <video ref="video" className={styles.frame}></video>
      </div>
    );
  }
});

export default SceneControls;
