function showEditAssignment(input, state) {
  const currentState = state.get(['course', 'showEditAssignment']);
  state.set(['course', 'showEditAssignment'], !currentState);
}

export default showEditAssignment;
