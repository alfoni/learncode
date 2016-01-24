function setTiers({state, input}) {
  if (input.tiers.length) {
    input.index = 0;
  }
  state.set(['techTree', 'tiers'], input.tiers);
}

export default setTiers;
