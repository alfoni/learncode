function startRecording(input, state, output, services) {
  state.merge(['recorder'], {
    isRecording: true
  });
  services.recorder.record({
    path: ['course']
  });
}

export default startRecording;
