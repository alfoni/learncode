function updateDescription({services, output, state}) {
  const updatedDescriptionCursor = state.get('courses.updatedDescription');
  const tagName = updatedDescriptionCursor.get('tagName');
  const description = updatedDescriptionCursor.get('description');
  const example = updatedDescriptionCursor.get('example');
  const exampleType = updatedDescriptionCursor.get('exampleType');

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
