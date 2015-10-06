function showLoadingCourse(input, state) {
  state.set(['snackbar'], {
    show: true,
    text: 'Loading course'
  });
  state.set(['course', 'isLoading'], true);
}

export default showLoadingCourse;
