function showAddFileInput(input, state) {
  state.set(
    [
      'course',
      'scenes',
      state.get(['course', 'currentScene']),
      'showAddFileInput'
    ], true);
}

export default showAddFileInput;
