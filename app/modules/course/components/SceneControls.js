import React from 'react';
import PlayButton from './SceneControls/PlayButton.js';
import RecordButton from './SceneControls/RecordButton.js';
import UploadButton from './SceneControls/UploadButton.js';
import styles from './SceneControls.css';
import {Decorator as Cerebral} from 'cerebral-react';
import Recorder from 'chrome-recorder';

@Cerebral({
  recorder: ['course', 'recorder']
})
class SceneControls extends React.Component {
  constructor() {
    super();
    this.recorder = null;
  }
  componentDidMount() {
    this.recorder = new Recorder(this.refs.video);
  }
  onRecordClick() {
    this.recorder.record(() => this.props.signals.course.recordClicked());
  }
  onStopClick() {
    this.props.signals.course.stopClicked();
    setTimeout(() => {
      this.recorder.stop();
    }, 250);
  }
  onPlayClick() {
    this.recorder.play(() => this.props.signals.course.playClicked());
  }
  onUploadClick() {
    const blobs = this.recorder.getBlobs();
    const audioData = new FormData();
    const videoData = new FormData();

    audioData.append('audio', blobs.audio);
    videoData.append('video', blobs.video);

    this.props.signals.course.uploadClicked();
    Promise.all([
      fetch('/API/courses/123/scenes/0/audio', {
        method: 'post',
        body: audioData
      }),
      fetch('/API/courses/123/scenes/0/video', {
        method: 'post',
        body: videoData
      })
    ]).then((responses) => {
      if (responses[0].status === 200 && responses[1].status === 200) {
        this.props.signals.course.uploadFinished();
      } else {
        throw new Error('Upload failed');
      }
    }).catch(() => {
      this.props.signals.course.uploadFailed();
    });
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <UploadButton
          recorder={this.props.recorder}
          onClick={() => this.onUploadClick()}
        />
        <RecordButton
          recorder={this.props.recorder}
          onRecordClick={() => this.onRecordClick()}
          onStopClick={() => this.onStopClick()}/>
        <PlayButton
          recorder={this.props.recorder}
          onPlayClick={() => this.onPlayClick()}
          onStopClick={this.props.signals.course.stopClicked}/>
        <video ref="video" className={styles.frame}></video>
      </div>
    );
  }
}

export default SceneControls;
