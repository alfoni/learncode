function startRecording(input, state, output, services) {
  state.set(['course', 'recorder', 'isRecording'], true);
  services.recorder.record();
}

export default startRecording;
