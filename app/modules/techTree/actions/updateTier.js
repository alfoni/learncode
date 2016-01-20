function updateTier({state, services, output}) {
  const selectedTierIndex = state.get(['techTree', 'selectedTierIndex']);
  const selectedTier = state.get(['techTree', 'tiers', selectedTierIndex]);

  services.ajax.patch('/API/tiers/' + selectedTier.id, {
    courseDependencyList: selectedTier.courseDependencyList
  })
  .then(() => {
    output.success();
  })
  .catch((e) => {
    console.log('Could not update tier', e);
    output.error(e);
  });
}

export default updateTier;
