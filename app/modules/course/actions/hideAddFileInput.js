function hideAddFileInput(input, state) {
  state.set(
    [
      'course',
      'scenes',
      state.get(['course', 'currentSceneIndex']),
      'showAddFileInput'
    ], false);
}

export default hideAddFileInput;
