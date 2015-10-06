function showPreview(input, state) {
  state.set(['course', 'showPreview'], true);
  state.set(['course', 'showConsole'], false);
}

export default showPreview;
