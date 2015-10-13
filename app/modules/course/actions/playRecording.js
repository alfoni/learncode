function playRecording(input, state, output, services) {
  state.set(['course', 'recorder', 'isPlaying'], true);
  services.recorder.seek(0, true);
}

export default playRecording;
