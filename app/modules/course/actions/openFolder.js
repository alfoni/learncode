function openFolder(input, state) {
  state.set(
    [
      'course',
      'scenes',
      state.get(['course', 'currentScene']),
      'showFolder'
    ], true);
}

export default openFolder;
