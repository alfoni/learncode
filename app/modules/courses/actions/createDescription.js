function createDescription({state, services, output}) {
  services.ajax.post(`/API/descriptions`, {
    tagName: state.get('courses.newDescription.tagName'),
    description: state.get('courses.newDescription.description'),
    exampleType: state.get('courses.newDescription.exampleType'),
    example: state.get('courses.newDescription.example')
  })
  .then(() => {
    output.success();
  })
  .catch(() => {
    output.error({
      message: 'Could not save description'
    });
  });
}

export default createDescription;
