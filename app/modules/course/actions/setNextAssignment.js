function setNextAssignment({module}) {
  const assignmentsPositions = module.state.get(['assignmentsPositions']);
  const currentAssignmentIndex = module.state.get(['currentAssignmentIndex']);
  const hasNextAssignment = Boolean([0, ...assignmentsPositions][currentAssignmentIndex + 1]);

  if (hasNextAssignment) {
    module.state.set(['currentAssignmentIndex'], currentAssignmentIndex + 1);
  } else {

  }
}

export default setNextAssignment;
