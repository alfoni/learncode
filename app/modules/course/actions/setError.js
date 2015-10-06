function setError(input, state) {
  state.merge('snackbar', {
    show: true,
    text: input.message || 'An error occured, please try again...'
  });
}

export default setError;
