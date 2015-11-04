function setLogs(input, state) {
  state.set(['log', 'users'], input.users);
}

export default setLogs;
