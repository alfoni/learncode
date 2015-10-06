function hideLoadingCourse(input, state) {
  state.set(['snackbar', 'show'], false);
  state.set(['course', 'isLoading'], false);
}

export default hideLoadingCourse;
