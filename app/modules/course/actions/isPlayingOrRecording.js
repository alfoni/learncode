function isPlayingOrRecording(input, state, output) {
  if (
    state.get(['course', 'recorder', 'isPlaying']) ||
    state.get(['course', 'recorder', 'isRecording'])
  ) {
    output.true();
  } else {
    output.false();
  }
}

isPlayingOrRecording.outputs = ['true', 'false'];

export default isPlayingOrRecording;
