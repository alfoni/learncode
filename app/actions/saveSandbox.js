import api from './../utils/api.js';

let saveSandbox = function(cerebral) {

  cerebral.set(['course', 'logs'], []);
  api.post('/sandbox', {
    sandbox: cerebral.get('course', 'sandbox')
  }).then(function () {
    cerebral.emit('sandbox:saved');
  });

};

export default saveSandbox;