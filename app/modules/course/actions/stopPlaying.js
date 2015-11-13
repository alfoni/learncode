function stopPlaying(input, state, output, services) {
  state.merge(['recorder'], {
    isRecording: false,
    isPlaying: false,
    hasRecorded: false
  });
  services.recorder.stop();
}

export default stopPlaying;
