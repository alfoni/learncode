function updateAssignmentDescription(input, state) {
  const currentSceneIndex = state.get(['course', 'currentSceneIndex']);
  state.set([
    'course',
    'scenes',
    currentSceneIndex,
    'assignment',
    'description'],
    input.description
  );
}

export default updateAssignmentDescription;
