function getMainAssignment({services, output, input, state}) {
  let tierId = input.tierId;
  let userId = input.userId;

  if (!tierId || !userId) {
    tierId = state.get(['course', 'isInTier']);
    userId = state.get(['user', 'id']);
  }

  services.ajax.get(`/API/mainAssignments/${tierId}/${userId}`)
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
