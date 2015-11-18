function setAssignmentResult(input, state) {
  const currentSceneIndex = state.get(['course', 'currentSceneIndex']);
  const currentResult = state.get(['course', 'scenes', currentSceneIndex, 'assignment', 'result']);
  state.set(['course', 'scenes', currentSceneIndex, 'assignment', 'result'], input.result);

  if (currentResult && currentResult !== input.result && !state.get(['recorder', 'isRecording']) && !state.get(['recorder', 'isPlaying'])) {
    state.set(['course', 'showAssignment'], true);
  }
}

export default setAssignmentResult;
