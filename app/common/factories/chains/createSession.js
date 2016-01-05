import showSnackbar from 'common/factories/actions/showSnackbar.js';

function createSession(name, chain) {
  function createSessionId({services, output}) {
    services.ajax.post('/API/sessions')
    .then((response) => {
      output.success({sessionId: response.sessionId});
    })
    .catch((e) => {
      console.log('Could not create session', e);
      output.error(e);
    });
  }

  function setSessionId({input, state}) {
    state.set(['session', 'sessionId'], input.sessionId);
  }

  function trackData({input, state, output, services}) {
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
  }

  return [
    [
      createSessionId, {
        success: [
          setSessionId,
          [
            trackData, {
              success: [],
              error: []
            }
          ]
        ].concat(chain),
        error: [
          showSnackbar('An error occured, please try again...')
        ]
      }
    ]
  ];
}

export default createSession;
