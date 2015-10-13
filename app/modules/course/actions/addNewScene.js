function addNewScene(input, state, output) {
  state.push(['course', 'scenes'], input.newScene);
  output({
    sceneIndex: state.get(['course', 'scenes']).length - 1
  });
}

export default addNewScene;
