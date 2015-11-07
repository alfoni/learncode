function get(url, key) {
  function action(input, state, output, services) {
    services.ajax.get(url)
      .then((response) => {
        output.success({
          [key]: response
        });
      })
      .catch(() => {
        output.error();
      });
  }

  action.displayName = `get (${url})`;

  return action;
}

export default get;
