function saveCourse(input, state, output, services) {
  services.ajax.post('/API/courses', {
    name: state.get(['courses', 'newCourseName'])
  })
  .then((response) => {
    output.success({id: response.id});
  })
  .catch(() => {
    output.error();
  });
}

export default saveCourse;
