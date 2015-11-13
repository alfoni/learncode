function playRecording(input, state, output, services) {
  state.set(['recorder', 'isPlaying'], true);
  services.recorder.play();
}

export default playRecording;
