function track(name, chain) {
  return [
    [
      function trackData(input, state, output, services) {
        const sessionId = state.get(['session', 'sessionId']);
        services.ajax.post(`/API/sessions/${sessionId}`, {
          name: name,
          input: input
        })
        .then(() => {
          output.success();
        })
        .catch((e) => {
          output.error(e);
        });
      }, {
        success: [],
        error: []
      }
    ]
  ].concat(chain);
}

export default track;
