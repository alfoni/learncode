function hideSnackbar(delay) {
  function timeout(input, state, output) {
    setTimeout(() => {
      output();
    }, delay);
  }

  timeout.displayName = 'timeout (' + delay + ')';

  function action(intpu, state) {
    state.merge(['snackbar'], {
      text: '',
      show: false
    });
  }

  action.displayName = 'hideSnackbar';

  return [
    [timeout],
    action
  ];
}

export default hideSnackbar;
