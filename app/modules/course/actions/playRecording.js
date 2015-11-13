function playRecording(input, state, output, services) {
  state.merge(['recorder'], {
    isPlaying: true,
    isEnded: false
  });
  services.recorder.play();
}

export default playRecording;
