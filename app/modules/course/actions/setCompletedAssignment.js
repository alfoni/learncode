function setCompletedAssignment({state, services}) {
  const user = state.get(['user']);
  const courseId = state.get(['course', 'id']);
  const sceneIndex = state.get(['course', 'currentSceneIndex']);
  const assignmentsSolvedCount = services.localAssignments.get(courseId, sceneIndex);

  let assignmentsSolved;

  if (user.isAdmin) {
    const currentAssignmentIndex = state.get(['course', 'currentAssignmentIndex']);
    assignmentsSolved = services.localAssignments.setFake(courseId, sceneIndex, currentAssignmentIndex + 1);
  } else {
    assignmentsSolved = services.localAssignments.set(courseId, sceneIndex, assignmentsSolvedCount + 1);
  }

  state.set(['user', 'assignmentsSolved'], assignmentsSolved);
}

export default setCompletedAssignment;
