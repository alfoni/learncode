function setSelectedTierIndex({state, input}) {
  const tierId = state.get(['course', 'isInTier']);
  let selectedTierIndex = state.get(['techTree', 'tiers']).findIndex((tier) => {
    return tier.id === tierId;
  });

  if (typeof input.tierIndex === 'number') {
    selectedTierIndex = input.tierIndex;
  }

  console.log(selectedTierIndex);

  state.set(['techTree', 'selectedTierIndex'], selectedTierIndex);
}

export default setSelectedTierIndex;
