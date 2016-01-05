function setSelectedSession({input, state}) {
  state.set(['sessions', 'selectedSession'], input.session);
}

export default setSelectedSession;
