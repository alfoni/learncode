let setLoadingCourse = function (cerebral) {
  cerebral.set('isLoadingCourse', true);
  cerebral.merge('snackbar', {
    message: 'Loading course...',
    show: true
  });
};

export default setLoadingCourse;