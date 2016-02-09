function setDescriptions({state, input}) {
  console.log(input.descriptions);
  state.set(['mainAssignment', 'descriptions'], input.descriptions.sort((a, b) => {
    if (a.tagName < b.tagName) {
      return -1;
    } else if (a.tagName > b.tagName) {
      return 1;
    }

    return 0;
  }));
}

export default setDescriptions;
