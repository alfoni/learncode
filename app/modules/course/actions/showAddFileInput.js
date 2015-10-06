function showAddFileInput(input, state) {
  state.set(
    [
      'course',
      'scenes',
      state.get(['course', 'currentSceneIndex']),
      'showAddFileInput'
    ], true);
}

export default showAddFileInput;
