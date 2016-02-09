function getMainAssignment({services, output, state}) {
  const tierIndex = state.get(['techTree', 'selectedTierIndex']);
  const tierId = state.get(['techTree', 'tiers', tierIndex, 'id']);

  services.ajax.get(`/API/mainAssignments/${tierId}`)
    .then((mainAssignment) => {
      output.success({
        mainAssignment: mainAssignment
      });
    }).catch((e) => {
      console.log('error', e);
      output.error({
        courseError: 'Kunne ikke hente hovedoppgave'
      });
    });
}

export default getMainAssignment;
