function updateNewSceneName(input, state) {
  state.set(['course', 'newSceneName'], input.value);
}

export default updateNewSceneName;
