function stopRecording(input, state, output, services) {
  state.merge(['course', 'recorder'], {
    isRecording: false,
    isPlaying: false,
    hasRecorded: true
  });
  services.recorder.stop();
}

export default stopRecording;
