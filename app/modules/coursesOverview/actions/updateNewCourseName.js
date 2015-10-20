function updateNewCourseName(input, state) {
  state.set(['coursesOverview', 'newCourseName'], input.newCourseName);
}

export default updateNewCourseName;
