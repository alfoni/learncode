function updateNewFileName({input, state}) {
  state.set(['course', 'newFileName'], input.fileName);
}

export default updateNewFileName;
