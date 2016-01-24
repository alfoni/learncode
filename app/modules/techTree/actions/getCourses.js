function getCourses({output, services}) {
  services.ajax.get('/API/courses')
  .then((courses) => {
    output.success({courses: courses});
  })
  .catch(() => {
    output.error();
  });
}

export default getCourses;
