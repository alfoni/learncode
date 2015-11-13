function stopRecording(input, state, output, services) {
  state.merge(['recorder'], {
    isRecording: false,
    isPlaying: false,
    hasRecorded: true,
    isEnded: true
  });
  services.recorder.stop();
}

export default stopRecording;
