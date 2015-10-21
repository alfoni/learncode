function startRecording(input, state, output, services) {
  state.merge(['course', 'recorder'], {
    isRecording: true
  });
  services.recorder.record();
}

export default startRecording;
