let startRecorderPlayback = function(cerebral, options) {
  cerebral.set(['course', 'lastEvent'], null);
  cerebral.recorder.seek(options.seek, options.startPlayback);
  return options.seek;
};

export default startRecorderPlayback;