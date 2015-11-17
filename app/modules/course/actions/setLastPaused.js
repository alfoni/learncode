function setLastPaused(input, state, output, services) {
  state.merge(['recorder'], {
    lastPaused: Date.now()
  });
}

export default setLastPaused;
