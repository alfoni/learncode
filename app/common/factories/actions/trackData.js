function trackData(type) {
  function action(input, state, output, services) {
    services.ajax.post(`/API/logs`, {
      type: type
    })
    .then(output)
    .catch(output);
  }

  action.displayName = `trackData (${type})`;

  return action;
}

export default trackData;
