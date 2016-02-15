function checkDescriptionState({state, output}) {
  if (state.get('courses.selectedDescription')) {
    output.updated();
  } else {
    output.created();
  }
}

checkDescriptionState.outputs = ['updated', 'created'];

export default checkDescriptionState;
