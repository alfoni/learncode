function resetAssignment({module}) {
  module.state.set(['currentAssignmentStatus', 'result'], false);
}

export default resetAssignment;
