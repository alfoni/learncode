function setActiveFile(input, state) {
  state.set(
    [
      'course',
      'scenes',
      state.get(['course', 'currentSceneIndex']),
      'currentFileIndex'
    ], input.index
  );
}

export default setActiveFile;
