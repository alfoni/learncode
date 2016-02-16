function setPreviewState({state, input}) {
  console.log('Setting preview state to', input.preview);
  if (input.preview) {
    state.set('mainAssignment.preview', true);
  } else {
    state.set('mainAssignment.preview', false);
  }
}

export default setPreviewState;
