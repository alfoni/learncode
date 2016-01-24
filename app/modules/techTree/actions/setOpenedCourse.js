function setOpenedCourse({state, input}) {
  state.set(['techTree', 'openedCourse'], {
    ...input
  });
}

export default setOpenedCourse;
