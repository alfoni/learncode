function isPlayingRecording({state, output}) {
  if (state.get(['recorder', 'isPlaying'])) {
    output.true();
  } else {
    output.false();
  }
}

isPlayingRecording.outputs = ['true', 'false'];

export default isPlayingRecording;
