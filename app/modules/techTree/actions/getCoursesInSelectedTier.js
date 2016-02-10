function getCoursesInSelectedTier({services, state, output, input}) {
  const tierId = state.get(['course', 'isInTier']);
  let selectedTierIndex = state.get(['techTree', 'tiers']).findIndex((tier) => {
    return tier.id === tierId;
  });

  if (typeof input.tierIndex === 'number') {
    selectedTierIndex = input.tierIndex;
  }
  console.log(selectedTierIndex);
  const selectedTierId = state.get(['techTree', 'tiers', selectedTierIndex, 'id']);

  services.ajax.get('/API/tiers/' + selectedTierId + '/courses')
  .then((courses) => {
    output.success({courses: courses});
  })
  .catch(() => {
    output.error();
  });
}

export default getCoursesInSelectedTier;
