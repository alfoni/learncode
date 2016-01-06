function setSelectedDescription({state, input}) {
  if (input.description) {
    state.set(['courses', 'selectedDescription'], input.description.tagName);
  } else {
    state.set(['courses', 'selectedDescription'], null);
  }
  state.set(['courses', 'updatedDescription', 'tagName'], input.description.tagName);
  state.set(['courses', 'updatedDescription', 'description'], input.description.description);
  state.set(['courses', 'updatedDescription', 'exampleType'], input.description.exampleType);
  state.set(['courses', 'updatedDescription', 'example'], input.description.example);
}

export default setSelectedDescription;
