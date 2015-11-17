function setCurrentSeek(input, state) {
  state.set(['recorder', 'currentSeek'], [input.seek, Date.now()]);
}

export default setCurrentSeek;
