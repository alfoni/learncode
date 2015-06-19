import api from './../utils/api.js';

let saveLatestSandbox = function(cerebral, seek, startPlayback) {

    // Check if do not trigger any save, as we need to refresh iframe
    let currentRecording = cerebral.recorder.currentRecording;
    let hasNotSaved = true;
    for (let x; x < currentRecording.signals.length; x++) {
      let signal = currentRecording.signals[x];
      if (signal.timestamp - currentRecording.start > seek) {
        break;
      } else if (signal.name === 'saveClicked') {
        hasNotSaved = false;
      }
    }

    if (hasNotSaved) {
      api.post('/sandbox', {
        sandbox: cerebral.recorder.currentRecording.initialState.sandbox
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