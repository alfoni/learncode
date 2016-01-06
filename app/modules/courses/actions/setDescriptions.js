function setDescriptions({state, input}) {
  state.set(['courses', 'descriptions'], input.descriptions);
}

export default setDescriptions;
