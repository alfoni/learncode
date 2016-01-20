function setSelectedTierIndex({state, input}) {
  console.log(input);
  state.set(['techTree', 'selectedTierIndex'], input.index);
}

export default setSelectedTierIndex;
