function updateAssignmentCode(input, state) {
  const currentSceneIndex = state.get(['course', 'currentScene']);
  state.set([
    'course',
    'scenes',
    currentSceneIndex,
    'assignment',
    'code'],
    input.code
  );
}

export default updateAssignmentCode;
