function addNewAssignment({state}) {
  const currentSceneIndex = state.get(['course', 'currentSceneIndex']);
  const assignmentsPath = ['course', 'scenes', currentSceneIndex, 'assignments'];
  const assignmentsCount = state.get(assignmentsPath).length;

  state.push(assignmentsPath, {
    description: '',
    code: '',
    completed: false
  });
  state.set(['course', 'currentAssignmentIndex'], assignmentsCount - 1);
  state.set(['course', 'scenesList', currentSceneIndex, 'assignmentsCount'], assignmentsCount + 1);
}

export default addNewAssignment;
