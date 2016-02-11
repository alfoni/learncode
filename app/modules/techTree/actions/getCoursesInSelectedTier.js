function getCoursesInSelectedTier({services, state, output, input}) {

  let selectedTierIndex = 0;
  const tierId = state.get(['course', 'isInTier']);

  if (typeof input.tierIndex === 'number') {
    selectedTierIndex = input.tierIndex;
  } else if (tierId) {
    selectedTierIndex = state.get(['techTree', 'tiers']).findIndex((tier) => {
      return tier.id === tierId;
    });
  }

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
