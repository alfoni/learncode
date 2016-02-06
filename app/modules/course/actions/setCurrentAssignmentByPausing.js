function setCurrentAssignmentByPausing({state, services}) {
  const assignmentsPositions = state.get(['course', 'assignmentsPositions']);
  const recording = services.recorder.getRecording();
  const lastSignal = services.recorder.getLastSignal();
  console.log(lastSignal, recording);
  state.set(['course', 'currentAssignmentIndex'], assignmentsPositions.indexOf(lastSignal.start - recording.start));
}

export default setCurrentAssignmentByPausing;
