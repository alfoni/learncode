function getMainAssignment({services, output, input, state}) {
  const userId = input.userId || state.get(['user', 'id']);

  services.ajax.get(`/API/mainAssignments/${userId}`)
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
