function get(url, key) {
  function action({services, output}) {
    services.http.get(url)
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
