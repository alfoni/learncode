function setMainAssignment({state, input}) {
  state.set(['mainAssignment', 'files'], input.mainAssignment.files);
  state.set(['mainAssignment', 'currentFileIndex'], 0);
  state.set(['mainAssignment', 'authorName'], input.mainAssignment.authorName);
  state.set(['mainAssignment', 'userId'], input.mainAssignment.userId);
  state.set(['mainAssignment', 'tierId'], input.tierId);
}

export default setMainAssignment;
