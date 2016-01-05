function setLogs({input, state}) {
  state.set(['sessions', 'sessionsList'], input.sessions);
}

export default setLogs;
