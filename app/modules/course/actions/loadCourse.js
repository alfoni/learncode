function loadCourse({input, output, services}) {
  services.ajax.get(`/API/courses/${input.courseId}`)
    .then((course) => {
      output({
        course: course
      });
    }).catch(() => {
      output({
        courseError: 'Kunne ikke hente kurs'
      });
    });
}

export default loadCourse;
