function saveCourse({state, output, services}) {
  services.http.post('/API/courses', {
    course: state.get('courses.newCourse')
  })
  .then((response) => {
    output.success({id: response.id});
  })
  .catch(() => {
    output.error();
  });
}

export default saveCourse;
