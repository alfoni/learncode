function loadCourse(input, state, output) {
  fetch('/API/courses/123')
    .then((response) => {
      if (response.status !== 200) {
        output({
          courseError: response.toString()
        });
      }

      return response.json();
    }
  ).then((course) => {
    output({
      course: course
    });
  }).catch((err) => {
    output({
      courseError: err.toString()
    });
  });
}

export default loadCourse;
