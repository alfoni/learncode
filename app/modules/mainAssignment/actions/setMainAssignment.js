function setMainAssignment({state, input}) {
  state.set(['mainAssignment', 'files'], input.mainAssignment.files);
  state.set(['mainAssignment', 'currentFileIndex'], 0);
  state.set(['mainAssignment', 'authorName'], input.mainAssignment.authorName);
}

export default setMainAssignment;
