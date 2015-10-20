function loadCourses(input, state, output, services) {
  services.ajax.get('/API/courses')
  .then((courses) => {
    output.success({courses: courses});
  })
  .catch(() => {
    output.error();
  });
}

export default loadCourses;
