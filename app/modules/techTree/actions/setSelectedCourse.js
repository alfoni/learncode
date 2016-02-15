function setSelectedCourse({state, input}) {
  state.set('techTree.selectedCourse', input.course);
}

export default setSelectedCourse;
