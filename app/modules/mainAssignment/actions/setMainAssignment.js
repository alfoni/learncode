function setMainAssignment({state, input}) {
  state.set('mainAssignment', {
    files: input.mainAssignment.files,
    currentFileIndex: 0,
    authorName: input.mainAssignment.authorName,
    userId: input.mainAssignment.userId,
    tierId: input.tierId
  });
}

export default setMainAssignment;
