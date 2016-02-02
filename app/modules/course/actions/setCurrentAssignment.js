function setCurrentAssignment({input, state, module}) {
  const assignmentsPositions = module.state.get(['assignmentsPositions']);
  const currentAssignmentIndex = [0, ...assignmentsPositions].reduce((currentIndex, position, index) => {
    if (input.seek > position) {
      return index;
    }

    return currentIndex;
  }, 0);
  module.state.set(['currentAssignmentIndex'], currentAssignmentIndex);
}

export default setCurrentAssignment;
