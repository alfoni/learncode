function setMainAssignmentAsCourse({state}) {
  state.set(['course', 'scenes', '0', 'sandboxFiles'], state.get(['mainAssignment', 'files']));
  state.set(['course', 'scenes', '0', 'currentFileIndex'], state.get(['mainAssignment', 'currentFileIndex']));
}

export default setMainAssignmentAsCourse;
