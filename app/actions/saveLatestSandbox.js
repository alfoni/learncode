import api from './../utils/api.js';

let saveLatestSandbox = function(cerebral, seek, startPlayback) {

    // Check if do not trigger any save, as we need to refresh iframe
    var currentRecording = cerebral.recorder.currentRecording;
    var hasNotSaved = true;
    for (var x; x < currentRecording.signals.length; x++) {
      var signal = currentRecording.signals[x];
      if (signal.timestamp - currentRecording.start > seek) {
        break;
      } else if (signal.name === 'saveClicked') {
        console.log('Jups, save is clicked');
        hasNotSaved = false;
      }
    }

    if (hasNotSaved) {
      api.post('/sandbox', {
        code: cerebral.recorder.currentRecording.initialState.code
      }).then(function () {
        cerebral.emit('sandbox:saved');
      });
    }

  return {
    seek: seek,
    startPlayback: startPlayback
  }

};

export default saveLatestSandbox;