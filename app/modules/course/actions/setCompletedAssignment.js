function setCompletedAssignment({state, services}) {
  const courseId = state.get(['course', 'id']);
  const sceneIndex = state.get(['course', 'currentSceneIndex']);

  state.push(['user', 'assignmentsSolved'], true);

  services.localAssignments.set(courseId, sceneIndex, state.get(['user', 'assignmentsSolved']));
}

export default setCompletedAssignment;
