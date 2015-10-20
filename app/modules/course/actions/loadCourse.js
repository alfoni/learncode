function loadCourse(input, state, output) {
  fetch(`/API/courses/${input.courseId}`)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error('Could not get course');
    }
  ).then((course) => {
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
