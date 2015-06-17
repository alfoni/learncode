let createSandbox = function (cerebral) {
  
  let currentFileIndex = cerebral.get('course', 'currentFileIndex');

  let sandbox = cerebral.get('course', 'files').map(function (file) {
    return file.toJS();
  });


  cerebral.set(['course', 'sandbox'], sandbox);
  cerebral.set(['course', 'code'], cerebral.get('course', 'sandbox', currentFileIndex, 'code'));

};

export default createSandbox;