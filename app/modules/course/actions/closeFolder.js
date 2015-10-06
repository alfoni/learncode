function closeFolder(input, state) {
  state.set(
    [
      'course',
      'scenes',
      state.get(['course', 'currentSceneIndex']),
      'showFolder'
    ], false);
}

export default closeFolder;
