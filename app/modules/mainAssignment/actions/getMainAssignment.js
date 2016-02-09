function getMainAssignment({services, output, input}) {
  services.ajax.get(`/API/mainAssignments/${input.tierId}/${input.userId}`)
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
