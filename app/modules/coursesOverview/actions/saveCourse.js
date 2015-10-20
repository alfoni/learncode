function saveCourse(input, state, output, services) {
  services.ajax.post('/API/courses/123/createScene', {
    name: state.get(['coursesOverview', 'newCourseName'])
  })
  .then((course) => {
    output.success({course: course});
  })
  .catch(() => {
    output.error();
  });
}

export default saveCourse;
