function updateAssignmentCode(input, state) {
  const currentSceneIndex = state.get(['course', 'currentSceneIndex']);
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
