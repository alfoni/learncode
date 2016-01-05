function setAssignment({input, state}) {
  state.set(['course', 'currentAssignmentIndex'], input.index);
}

export default setAssignment;
