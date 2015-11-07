function redirect(url) {
  function action(input, state, output, services) {
    services.router.redirect(url);
  }

  action.displayName = `redirect (${url})`;

  return action;
}

export default redirect;
