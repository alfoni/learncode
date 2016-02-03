function getCoursesInSelectedTier({services, state, output, input}) {
  const selectedTierIndex = input.index || 0;
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
