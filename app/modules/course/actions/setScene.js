function setScene(input, state) {
  const currentFileIndex = state.get(['course', 'scenes', input.scene.index, 'currentFileIndex']);

  state.set(['course', 'scenes', input.scene.index], input.scene);
  state.set(['course', 'scenes', input.scene.index, 'sandboxFiles'], input.scene.files);

  if (currentFileIndex) {
    state.set(['course', 'scenes', input.scene.index, 'currentFileIndex'], currentFileIndex);
  } else {
    state.set(['course', 'scenes', input.scene.index, 'currentFileIndex'], 0);
  }
}

export default setScene;
