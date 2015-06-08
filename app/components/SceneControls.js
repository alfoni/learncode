import React from 'react';
import mixin from 'cerebral/mixin';
import RecordButton from './SceneControls/RecordButton.js';
import PlayButton from './SceneControls/PlayButton.js';
import DurationSlider from './SceneControls/DurationSlider.js';
import {
  Paper
} from 'material-ui';

let SceneControlsStyle = {
  height: '30px',
  backgroundColor: '#EEE',
  paddingRight: '300px'
};

let VideoScreenStyle = {
  position: 'absolute',
  right: '25px',
  top: '25px',
  height: '200px',
  backgroundColor: '#000',
  overflow: 'hidden'
};

let VideoStyle = {
  height: '200px',
  width: '267px'
};

let RecordRTC = global.RecordRTC;

let SceneControls = React.createClass({
  mixins: [mixin],
  streamRecorder: null,
  stream: null,
  video: null,
  getCerebralState() {
    return ['recorder'];
  },
  componentDidMount() {
    this.video = this.refs.video.getDOMNode();
  },
  onPlayClick() {
    if (this.state.recorder.isPlaying) {
      this.video.pause();
      this.signals.recorder.paused();
    } else {
      this.video.addEventListener('loadeddata', this.startPlayback); 
      this.video.addEventListener('playing', this.seekPlayback);   
      this.video.src = this.recording;
      this.video.play();
    }

  },
  startPlayback() {

    this.signals.recorder.play();
    this.video.removeEventListener('loadeddata', this.startPlayback);

  },
  seekPlayback() {
    // TODO: Have to sync pause to full second, to make video work in sync
    let seconds = this.state.recorder.currentDuration ? Math.round(this.state.recorder.currentDuration / 1000) : 0;
    console.log('seconds', seconds);
    this.video.currentTime = seconds;
    this.video.removeEventListener('playing', this.seekPlayback);
  },
  onRecordClick() {
    if (this.state.recorder.isRecording) {
      this.stream.stop();
      this.streamRecorder.stopRecording(function (recording) {
        this.recording = recording;
      }.bind(this));
      this.signals.recorder.stop();
    } else {
    (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia).call(navigator, {
      video: {
        height: 200
      },
      audio: true
    }, this.streamRecording, function (err) {
      console.log('Failed!', err);
    });      
    }
  },
  streamRecording(stream) {
    this.stream = stream;
    this.streamRecorder = RecordRTC(stream);
    this.video.addEventListener('loadeddata', this.startRecording);
    this.video.src = window.URL.createObjectURL(stream);
    this.video.play();
  },
  startRecording() {
    this.streamRecorder.startRecording();
    this.signals.recorder.record();
    this.video.removeEventListener('loadeddata', this.startRecording);
  },
  render() {
    return (
      <div style={SceneControlsStyle}>
        <DurationSlider/>
        <Paper zDepth={3} style={VideoScreenStyle}>
          <video ref="video" height="200" style={VideoStyle}/>
        </Paper>
        <RecordButton onClick={this.onRecordClick}/>
        <PlayButton onClick={this.onPlayClick}/>
      </div>
    );
  }
});

export default SceneControls;
