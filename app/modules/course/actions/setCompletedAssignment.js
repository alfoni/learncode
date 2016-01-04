function setCompletedAssignment(input, state) {
  const courseId = state.get(['course', 'id']);
  const sceneIndex = state.get(['course', 'currentSceneIndex']);
  const assignmentIndex = state.get(['course', 'currentAssignmentIndex']);
  const completedAssignmentsPath = ['user', 'completedAssignments'];

  if (!state.get([...completedAssignmentsPath, courseId])) {
    state.set([...completedAssignmentsPath, courseId], {
      [sceneIndex]: [
        assignmentIndex
      ]
    });
  } else if (!state.get([...completedAssignmentsPath, courseId, sceneIndex])) {
    state.set([...completedAssignmentsPath, courseId, sceneIndex], [
      assignmentIndex
    ]);
  } else {
    state.push([...completedAssignmentsPath, courseId, sceneIndex], assignmentIndex);
  }
}

export default setCompletedAssignment;
