function addNewFile(input, state, output) {
  const currentSceneIndex = state.get(['course', 'currentSceneIndex']);

  state.push(['course', 'scenes', currentSceneIndex, 'sandboxFiles'], {
    name: input.name,
    code: ''
  });

  output({
    index: state.get(['course', 'scenes', currentSceneIndex, 'sandboxFiles']).length - 1
  });
}

export default addNewFile;
