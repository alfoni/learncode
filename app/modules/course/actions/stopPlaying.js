function stopPlaying(input, state, output, services) {
  state.merge(['course', 'recorder'], {
    isRecording: false,
    isPlaying: false,
    hasRecorded: false
  });
  services.recorder.stop();
}

export default stopPlaying;
