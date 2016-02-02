function setCompletedAssignment({state, services}) {
  const courseId = state.get(['course', 'id']);
  const sceneIndex = state.get(['course', 'currentSceneIndex']);
  const assignmentsSolvedCount = services.localAssignments.get(courseId, sceneIndex);
  const assignmentsSolved = services.localAssignments.set(courseId, sceneIndex, assignmentsSolvedCount + 1);
  state.set(['user', 'assignmentsSolved'], assignmentsSolved);
}

export default setCompletedAssignment;
