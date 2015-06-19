import api from './../utils/api.js';

let saveSandbox = function(cerebral) {

  api.post('/sandbox', {
    sandbox: cerebral.get('course', 'sandbox')
  }).then(function () {
    cerebral.emit('sandbox:saved');
  });

};

export default saveSandbox;