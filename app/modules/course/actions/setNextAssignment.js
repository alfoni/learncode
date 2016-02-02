function setNextAssignment({module}) {
  const currentAssignmentIndex = module.state.get(['currentAssignmentIndex']);
  module.state.set(['currentAssignmentIndex'], currentAssignmentIndex + 1);
}

export default setNextAssignment;
