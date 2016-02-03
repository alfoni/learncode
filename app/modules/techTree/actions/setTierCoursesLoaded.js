function setTierCoursesLoaded({state, input}) {
  const selectedTierIndex = input.index || 0;
  const selectedTierId = state.get(['techTree', 'tiers', selectedTierIndex, 'id']);

  state.push(['techTree', 'loadedTiers'], selectedTierId);
}

export default setTierCoursesLoaded;
