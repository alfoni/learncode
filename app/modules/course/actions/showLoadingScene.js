function showLoadingScene(input, state) {
  state.set(['snackbar'], {
    show: true,
    text: 'Loading scene...'
  });
}

export default showLoadingScene;
