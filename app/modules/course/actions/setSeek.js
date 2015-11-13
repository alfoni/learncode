function setSeek(input, state, output, services) {
  state.set(['course', 'currentSeek'], [input.seek, Date.now()]);
  services.recorder.seek(input.seek);
}

export default setSeek;
