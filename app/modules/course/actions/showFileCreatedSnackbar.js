function showFileCreatedSnackbar(input, state) {
  state.set(['snackbar'], {
    show: true,
    text: input.name + ' was created'
  });
}

export default showFileCreatedSnackbar;
