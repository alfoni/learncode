function openFolder(input, state) {
  state.set(
    [
      'course',
      'scenes',
      state.get(['course', 'currentSceneIndex']),
      'showFolder'
    ], true);
}

export default openFolder;
