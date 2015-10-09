function hideAddFileInput(input, state) {
  state.set(
    [
      'course',
      'scenes',
      state.get(['course', 'currentScene']),
      'showAddFileInput'
    ], false);
}

export default hideAddFileInput;
