function showSnackbarMessage(input, state) {
  state.set(['snackbar'], {
    text: 'Takk for din interesse!',
    show: true
  });
}

export default showSnackbarMessage;
