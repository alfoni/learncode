function setMainAssignment({state, input}) {
  state.set(['course', 'scenes', 0, 'sandboxFiles'], input.mainAssignment.files);
  state.set(['course', 'scenes', 0, 'currentFileIndex'], 0);
  state.set(['mainAssignment', 'authorName'], input.mainAssignment.authorName);
  state.set(['mainAssignment', 'sessionId'], input.mainAssignmentSessionId);
}

export default setMainAssignment;
