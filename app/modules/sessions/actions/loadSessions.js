function loadSessions(input, state, output, services) {
  services.ajax.get(`/API/sessions`)
    .then((sessions) => {
      output.success({
        sessions: sessions
      });
    })
    .catch(() => {
      output.error({
        message: 'Could not get sessions'
      });
    });
}

export default loadSessions;
