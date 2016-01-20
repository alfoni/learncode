function setTiers({state, input}) {
  state.set(['techTree', 'tiers'], input.tiers);
}

export default setTiers;
