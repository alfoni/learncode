function hasSelectedCourse({state, output}) {
  if (state.get('techTree.selectedCourse')) {
    output.true();
  } else {
    output.false();
  }
}

hasSelectedCourse.outputs = ['true', 'false'];

export default hasSelectedCourse;
