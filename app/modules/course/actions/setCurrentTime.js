function setCurrentTime(input, state) {
  const currentSceneIndex = state.get(['course', 'currentSceneIndex']);
  state.set(['course', 'scenes', currentSceneIndex, 'recording', 'currentTime'], input.seek);
}

export default setCurrentTime;
