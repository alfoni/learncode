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
  backgroundColor: '#EEE'
};

let VideoScreenStyle = {
  position: 'absolute',
  right: '25px',
  bottom: '25px',
  height: '200px',
  zIndex: 10,
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
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();
  },
  onPlayClick() {
    if (this.state.recorder.isPlaying) {
      this.video.pause();
      this.audio.stop();
      this.signals.pauseClicked();
    } else {
      
      this.video.addEventListener('canplay', this.seekPlayback);
      this.video.src = this.video.src;

    }

  },
  seekPlayback(event, seek, startPlayback) {

    startPlayback = typeof startPlayback === 'undefined' ? true : startPlayback;
    seek = seek || (this.state.recorder.isAtEnd ? 0 : this.state.recorder.seek);
    this.audioContext.decodeAudioData(this.buffer, function (buffer) {
      this.audio = this.audioContext.createBufferSource(); // creates a sound source
      this.audio.buffer = buffer;                    // tell the source which sound to play
      this.audio.connect(this.audioContext.destination);  

      var start = function () {
        this.startSomething(seek, startPlayback);   
        this.video.removeEventListener('playing', start); 
      }.bind(this);

      this.video.addEventListener('playing', start);
      this.video.currentTime = seek / 1000;
      this.video.play();

    }.bind(this));

    this.video.removeEventListener('canplay', this.seekPlayback);

  },
   startSomething(seek, startPlayback) {
    if (startPlayback) {
      this.audio.start(0, seek / 1000);
    } else {
      this.video.pause();
    }
    this.signals.playClicked(seek, startPlayback);
  },
  onRecordClick() {
    if (this.state.recorder.isRecording) {

      this.multiStreamRecorder.stop();
      this.stream.stop();
      this.signals.stopClicked();

    } else {
    (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia).call(navigator, {
      video: true,
      audio: true
    }, this.streamRecording, function (err) {
      console.log('Failed!', err);
    });      
    }
  },
  streamRecording(stream) {

    this.multiStreamRecorder = new MultiStreamRecorder(stream);
    this.multiStreamRecorder.video = this.video; // to get maximum accuracy
    this.multiStreamRecorder.audioChannels = 1;
    this.multiStreamRecorder.ondataavailable = function (blobs) {

      var self = this;
      var fileReader = new FileReader();
      fileReader.onload = function() {
        
        self.buffer = this.result;

      };
      fileReader.readAsArrayBuffer(blobs.audio);

      this.video.src = window.URL.createObjectURL(blobs.video);

      this.video.pause();

    }.bind(this);

    this.video.addEventListener('loadeddata', this.startRecording);
    this.video.src = window.URL.createObjectURL(stream);
    this.video.play();
    this.stream = stream;

  },
  startRecording() {
    // Five minutes
    this.multiStreamRecorder.start(5 * 60 * 60 * 1000);
    this.signals.recordClicked();
    this.video.removeEventListener('loadeddata', this.startRecording);
  },
  onSliderChange(event, value) {
    var seek = this.state.recorder.duration * value;
    if (this.state.recorder.isPlaying) {
      this.audio.stop();
    }
    this.seekPlayback(null, seek, this.state.recorder.isPlaying);
  },
  render() {
    return (
      <div style={SceneControlsStyle}>
        <DurationSlider onSliderChange={this.onSliderChange}/>
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
