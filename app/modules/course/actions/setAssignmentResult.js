function setAssignmentResult(input, state) {
  const currentSceneIndex = state.get(['course', 'currentSceneIndex']);
  state.set(['course', 'scenes', currentSceneIndex, 'assignment', 'result'], input);
}

export default setAssignmentResult;
