function addNewScene(input, state, output) {
  state.push(['course', 'scenes'], input.newScene);
  output({
    index: state.get(['course', 'scenes']).length - 1
  });
}

export default addNewScene;
