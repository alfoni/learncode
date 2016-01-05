function closeAllPopovers({state}) {
  state.set(['course', 'showFolder'], false);
  state.set(['course', 'showAssignment'], false);
  state.set(['course', 'showConfigureScenes'], false);
  state.set(['course', 'showScenesList'], false);
}

export default closeAllPopovers;
