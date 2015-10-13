function openScenesList(input, state) {
  const currentSceneIndex = state.get(['course', 'currentSceneIndex']);
  state.set(['course', 'scenes', currentSceneIndex, 'showScenesList'], true);
}

export default openScenesList;
