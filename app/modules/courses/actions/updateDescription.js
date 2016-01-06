function updateDescription({services, output, state}) {
  const tagName = state.get(['courses', 'updatedDescription', 'tagName']);
  const description = state.get(['courses', 'updatedDescription', 'description']);
  const example = state.get(['courses', 'updatedDescription', 'example']);
  const exampleType = state.get(['courses', 'updatedDescription', 'exampleType']);

  services.ajax.patch('/API/descriptions/' + tagName, {
    tagName: tagName,
    description: description,
    exampleType: exampleType,
    example: example
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

export default updateDescription;
