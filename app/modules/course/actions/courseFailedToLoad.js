function courseFailedToLoad(input, state) {
  state.set(['snackbar'], {
    show: true,
    text: 'Failed to load course'
  });
}

export default courseFailedToLoad;
