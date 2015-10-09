function closeFolder(input, state) {
  state.set(
    [
      'course',
      'scenes',
      state.get(['course', 'currentScene']),
      'showFolder'
    ], false);
}

export default closeFolder;
