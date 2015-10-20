function updateNewCourseName(input, state) {
  state.set(['courses', 'newCourseName'], input.newCourseName);
}

export default updateNewCourseName;
