function trackData(message) {
  function action(input, state, output, services) {
    services.ajax.post(`/API/user/logs`, {
      message: message
    })
    .then(output)
    .catch(output);
  }

  action.displayName = `trackData (${message})`;

  return action;
}

export default trackData;
