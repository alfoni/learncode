function setOpenedSignal({input, state}) {
  state.set('sessions.openedSignal', input.index);
}

export default setOpenedSignal;
