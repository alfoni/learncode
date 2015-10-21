function setAssignmentResult(input, state) {
  const currentSceneIndex = state.get(['course', 'currentSceneIndex']);
  state.set(['course', 'scenes', currentSceneIndex, 'assignment', 'result'], input.message);
}

export default setAssignmentResult;
