function showSavingScene(input, state) {
  state.set(['snackbar'], {
    show: true,
    text: 'Saving scene...'
  });
}

export default showSavingScene;
