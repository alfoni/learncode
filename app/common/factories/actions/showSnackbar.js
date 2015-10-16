function showSnackbar(text) {
  function action(input, state) {
    state.merge(['snackbar'], {
      text: text,
      show: true
    });
  }

  action.displayName = 'showSnackbar';

  return action;
}

export default showSnackbar;
