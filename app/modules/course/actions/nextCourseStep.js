function nextCourseStep({module, output}) {
  const currentAssignmentIndex = module.state.get(['currentAssignmentIndex']);
  const assignmentsPositions = module.state.get(['assignmentsPositions']);
  const scenes = module.state.get(['scenes']);
  const currentSceneIndex = module.state.get(['currentSceneIndex']);

  const noMoreAssignments = currentAssignmentIndex === [0, ...assignmentsPositions].length;
  const isLastScene = Number(currentSceneIndex) === Number(scenes.length - 1);

  if (noMoreAssignments && isLastScene) {
    output.course();
  } else if (noMoreAssignments) {
    output.scene({
      sceneIndex: Number(currentSceneIndex) + 1
    });
  } else {
    output.assignment({
      seek: [0, ...assignmentsPositions][currentAssignmentIndex] + 100
    });
  }
}

nextCourseStep.outputs = ['course', 'scene', 'assignment'];

export default nextCourseStep;
