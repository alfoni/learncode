function updateAssignmentDescription(input, state) {
  const currentSceneIndex = state.get(['course', 'currentScene']);
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
