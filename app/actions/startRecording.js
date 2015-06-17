let startRecording = function(cerebral) {
  let currentFileIndex = cerebral.get('course', 'currentFileIndex');
  cerebral.set(['course', 'code'], cerebral.get('course', 'files', currentFileIndex, 'code'));
  cerebral.set(['course', 'lastEvent'], null);
  cerebral.recorder.record('course'); 
};

export default startRecording;