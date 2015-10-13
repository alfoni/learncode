function playRecording(input, state, output, services) {
  services.recorder.seek(0, true);
  state.set(['course', 'recorder', 'isPlaying'], true);
}

export default playRecording;
