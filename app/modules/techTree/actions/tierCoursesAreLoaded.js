function tierCoursesAreLoaded({state, output, input}) {
  const loadedTiers = state.get(['techTree', 'loadedTiers']);
  const selectedTierIndex = input.index || 0;
  const selectedTierId = state.get(['techTree', 'tiers', selectedTierIndex, 'id']);
  
  if (loadedTiers.indexOf(selectedTierId) >= 0) {
    output.true();
  } else {
    output.false();
  }
}

tierCoursesAreLoaded.outputs = ['true', 'false'];

export default tierCoursesAreLoaded;
