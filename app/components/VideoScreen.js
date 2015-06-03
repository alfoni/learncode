/*
 function onVideoFail(e) {
        console.log('webcam fail!', e);
      };

    function hasGetUserMedia() {
      // Note: Opera is unprefixed.
      return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia || navigator.msGetUserMedia);
    }

    if (hasGetUserMedia()) {
      // Good to go!
    } else {
      alert('getUserMedia() is not supported in your browser');
    }

    window.URL = window.URL || window.webkitURL;
    navigator.getUserMedia  = navigator.getUserMedia || 
                             navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia || 
                               navigator.msGetUserMedia;

    var video = document.querySelector('video');
    var streamRecorder;
    var webcamstream;

    if (navigator.getUserMedia) {
      navigator.getUserMedia({audio: true, video: true}, function(stream) {
        video.src = window.URL.createObjectURL(stream);
        webcamstream = stream;
    //  streamrecorder = webcamstream.record();
      }, onVideoFail);
    } else {
        alert ('failed');
    }

    function startRecording() {
        streamRecorder = webcamstream.record();
        setTimeout(stopRecording, 10000);
    }
    function stopRecording() {
        streamRecorder.getRecordedData(postVideoToServer);
    }
    function postVideoToServer(videoblob) {

        var data = {};
        data.video = videoblob;
        data.metadata = 'test metadata';
        data.action = "upload_video";
        jQuery.post("http://www.kongraju.in/uploadvideo.php", data, onUploadSuccess);
    }
    function onUploadSuccess() {
        alert ('video uploaded');
    }
*/
import React from 'react';
import mixin from 'cerebral/mixin';
import {
  Paper
} from 'material-ui';

let VideoScreenStyle = {
  position: 'fixed',
  right: '25px',
  top: '25px'
};

let VideoScreen = React.createClass({
  mixins: [mixin],
  streamrecorder: null,
  componentWillMount() {
    this.context.cerebral.on('recording.start', this.onRecordVideoEvent);
  },
  componentWillUnmount() {
    this.context.cerebral.off('recording.start', this.onRecordVideoEvent);
  },
  getCerebralState() {
    return {};
  },
  onRecordVideoEvent() {
    (navigator.getUserMedia || navigator.webkitGetUserMedia)({
      video: true,
      audio: true
    }, this.streamRecording);
  },
  streamRecording(stream) {
    this.refs.video.getDOMNode().src = window.URL.createObjectURL(stream);
    this.streamrecorder = stream.record();
  },
  render() {
    return (
      <Paper zDepth={1} style={{VideoScreenStyle}}>
        <video ref="video"/>
      </Paper>
    );
  }
});

export default VideoScreen;
