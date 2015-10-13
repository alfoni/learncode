function closeScenesList(input, state) {
  const currentSceneIndex = state.get(['course', 'currentSceneIndex']);
  state.set(['course', 'scenes', currentSceneIndex, 'showScenesList'], false);
}

export default closeScenesList;
