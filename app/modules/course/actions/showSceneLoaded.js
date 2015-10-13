function showSceneLoaded(input, state) {
  state.set(['snackbar'], {
    show: true,
    text: 'Scene was saved and loaded'
  });
}

export default showSceneLoaded;
