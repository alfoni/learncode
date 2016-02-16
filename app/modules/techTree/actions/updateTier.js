function updateTier({state, services, output}) {
  const selectedTierIndex = state.get('techTree.selectedTierIndex');
  const selectedTier = state.get(`techTree.tiers.${selectedTierIndex}`);

  services.http.patch('/API/tiers/' + selectedTier.id, {
    courseDependencyList: selectedTier.courseDependencyList
  })
  .then((updatedCourses) => {
    output.success({courses: updatedCourses});
  })
  .catch((e) => {
    console.log('Could not update tier', e);
    output.error(e);
  });
}

export default updateTier;
