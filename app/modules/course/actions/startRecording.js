function startRecording({state, services}) {
  state.merge(['recorder'], {
    isRecording: true,
    isEnded: false
  });
  const currentSceneIndex = state.get(['course', 'currentSceneIndex']);
  state.unset(['course', 'scenes', currentSceneIndex, 'duration']);
  state.set(['course', 'scenes', currentSceneIndex, 'recording'], true);
  services.recorder.record({
    path: ['course']
  });
}

export default startRecording;
