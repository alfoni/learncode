import currentScene from '../computed/currentScene';

function setAssignmentPoints({state, services}) {
  const scene = state.get(currentScene);

  if (scene.recording) {
    const recording = services.recorder.getRecording();
    const assignmentPoints = recording.signals.filter((signal) => {
      return signal.name === 'course.pauseClicked';
    }).map((signal) => {
      return signal.start - recording.start;
    });
    state.set(['course', 'assignmentPoints'], assignmentPoints);
  } else {
    state.set(['course', 'assignmentPoints'], []);
  }
}

export default setAssignmentPoints;
