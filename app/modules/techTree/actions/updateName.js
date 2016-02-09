function updateName({state, input}) {
  state.set(['techTree', 'authorName'], input.value);
}

export default updateName;
