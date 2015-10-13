function playRecording(input, state, output, services) {
  state.set(['course', 'recorder', 'isPlaying'], true);
  services.recorder.play();
}

export default playRecording;
