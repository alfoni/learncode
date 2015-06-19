let createSandbox = function (cerebral) {
  
  let currentFileIndex = cerebral.get('course', 'currentFileIndex');

  let sandbox = cerebral.get('course', 'files').map(function (file) {
    return file.toJS();
  });

  cerebral.set(['course', 'sandbox'], sandbox);

};

export default createSandbox;