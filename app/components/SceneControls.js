/*
 var session = {
    audio: true,
    video: true
};

var recordRTC;

navigator.getUserMedia(session, function (mediaStream) {
    recordRTC = RecordRTC(MediaStream);
    recordRTC.startRecording();
}, onError);

btnStopRecording.onclick = function () {
    recordRTC.stopRecording(function (audioVideoWebMURL) {
        video.src = audioVideoWebMURL;

        var recordedBlob = recordRTC.getBlob();
        recordRTC.getDataURL(function(dataURL) { });
    });
};
*/
import React from 'react';
import mixin from 'cerebral/mixin';
import RecordButton from './RecordButton.js';
import PlayButton from './PlayButton.js';
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
  top: '25px',
  width: '150px',
  height: '150px',
  backgroundColor: '#000'
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
  onPlayClick() {
    let video = this.refs.video.getDOMNode();
    video.addEventListener('loadeddata', function () {
      video.play();
      this.signals.recorder.play();
    }.bind(this));    
    video.src =  this.video;

  },
  onRecordClick() {
    if (this.state.recorder.isRecording) {
      this.stream.stop();
      this.streamRecorder.stopRecording(function (video) {
        this.video = video;
      }.bind(this));
      this.signals.recorder.stop();
    } else {
    (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia).call(navigator, {
      video: {
        mandatory: {
          //maxWidth: 150,
          //maxHeight: 150
        }
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
    let video = this.refs.video.getDOMNode();
    video.addEventListener('loadeddata', function () {
        this.streamRecorder.startRecording();
        this.signals.recorder.record();
    }.bind(this));
    video.src = window.URL.createObjectURL(stream);
    video.play();
  },
  render() {
    return (
      <div style={SceneControlsStyle}>
        <Paper zDepth={1} style={VideoScreenStyle}>
          <video ref="video" width="150" height="150"/>
        </Paper>
        <RecordButton onClick={this.onRecordClick}/>
        <PlayButton onClick={this.onPlayClick}/>
      </div>
    );
  }
});

export default SceneControls;
