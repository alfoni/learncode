function setDescriptions({state, input}) {
  state.set(['mainAssignment', 'descriptions'], input.descriptions);
}

export default setDescriptions;
