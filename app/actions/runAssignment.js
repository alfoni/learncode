import api from './../utils/api.js';

let runAssigment = function (cerebral) {

  api.post('/sandbox', {
    sandbox: cerebral.get('course', 'sandbox'),
    assignment: cerebral.get('course', 'assignment', 'code')
  }).then(function () {
    cerebral.emit('sandbox:saved');
  });

};

export default runAssigment;