function setActiveFile(input, state) {
  console.log(input.index);
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
