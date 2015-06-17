let startRecorderPlayback = function(cerebral, options) {
  let currentFileIndex = cerebral.get('course', 'currentFileIndex');
  cerebral.set(['course', 'code'], cerebral.get('course', 'files', currentFileIndex, 'code'));
  cerebral.recorder.seek(options.seek, options.startPlayback);
  return options.seek;
};

export default startRecorderPlayback;