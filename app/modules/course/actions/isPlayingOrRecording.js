function isPlayingOrRecording(input, state, output) {
  if (
    state.get(['recorder', 'isPlaying']) ||
    state.get(['recorder', 'isRecording'])
  ) {
    output.true();
  } else {
    output.false();
  }
}

isPlayingOrRecording.outputs = ['true', 'false'];

export default isPlayingOrRecording;
