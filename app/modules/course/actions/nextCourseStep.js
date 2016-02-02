function nextCourseStep({module, output}) {
  const currentAssignmentIndex = module.state.get(['currentAssignmentIndex']);
  const assignmentsPositions = module.state.get(['assignmentsPositions']);
  const scenes = module.state.get(['scenes']);
  const currentSceneIndex = module.state.get(['currentSceneIndex']);

  const isLastAssignment = currentAssignmentIndex === [0, ...assignmentsPositions].length - 1;
  const isLastScene = currentSceneIndex === scenes.length - 1;

  if (isLastAssignment && isLastScene) {
    output.course();
  } else if (isLastAssignment) {
    output.scene();
  } else {
    output.assignment();
  }
}

nextCourseStep.outputs = ['course', 'scene', 'assignment'];

export default nextCourseStep;
