function setMainAssignmentAsCourse({state}) {
  const sceneCursor = state.get('course.scenes.0');
  
  sceneCursor.set('sandboxFiles', state.get('mainAssignment.files'));
  sceneCursor.set('currentFileIndex', state.get('mainAssignment.currentFileIndex'));
}

export default setMainAssignmentAsCourse;
