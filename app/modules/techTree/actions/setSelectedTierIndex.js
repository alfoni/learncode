function setSelectedTierIndex({state, input}) {
  state.set(['techTree', 'selectedTierIndex'], input.index);
}

export default setSelectedTierIndex;
