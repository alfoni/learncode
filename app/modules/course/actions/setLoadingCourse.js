function setLoadingCourse({state}) {
  state.merge(['snackbar'], {
    text: 'Laster kurs...',
    show: true
  });
}

export default setLoadingCourse;
