import api from './../utils/api.js';

let saveSandbox = function(cerebral) {

  let currentFileIndex = cerebral.get('course', 'currentFileIndex');

  api.post('/sandbox', {
    code: cerebral.get('course', 'sandbox', currentFileIndex, 'code')
  }).then(function () {
    cerebral.emit('sandbox:saved');
  });

};

export default saveSandbox;