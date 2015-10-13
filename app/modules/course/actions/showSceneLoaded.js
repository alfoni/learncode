function showSceneLoaded(input, state) {
  state.set(['snackbar'], {
    show: true,
    text: 'Scene was loaded'
  });
}

export default showSceneLoaded;
