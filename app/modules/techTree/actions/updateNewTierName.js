function updateNewTierName({state, input}) {
  state.set(['techTree', 'newTierName'], input.name);
}

export default updateNewTierName;
