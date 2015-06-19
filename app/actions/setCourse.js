let setCourse = function (cerebral, course) {
  cerebral.set('course', course);
  cerebral.set('isLoadingCourse', false);
  cerebral.set(['snackbar', 'show'], false);
};

export default setCourse;