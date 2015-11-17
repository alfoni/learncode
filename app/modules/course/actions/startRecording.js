function startRecording(input, state, output, services) {
  state.merge(['recorder'], {
    isRecording: true,
    isEnded: false
  });
  const currentSceneIndex = state.get(['course', 'currentSceneIndex']);
  state.unset(['course', 'scenes', currentSceneIndex, 'duration']);
  services.recorder.record({
    path: ['course']
  });
}

export default startRecording;
