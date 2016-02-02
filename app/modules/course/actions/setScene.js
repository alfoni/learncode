function setScene({input, state, services}) {
  const currentFileIndex = state.get(['course', 'scenes', input.sceneIndex, 'currentFileIndex']);
  const scene = input.scene;
  const recording = scene.recording;

  // We do not need to put the recording in the state tree
  if (scene.recording) {
    scene.duration = scene.recording.duration;
  }

  scene.recording = Boolean(scene.recording);

  state.set(['course', 'scenes', input.sceneIndex], scene);
  state.set(['course', 'scenes', input.sceneIndex, 'sandboxFiles'], scene.files);

  if (currentFileIndex) {
    state.set(['course', 'scenes', input.sceneIndex, 'currentFileIndex'], currentFileIndex);
  } else {
    state.set(['course', 'scenes', input.sceneIndex, 'currentFileIndex'], 0);
  }

  if (recording) {
    services.recorder.loadRecording(recording);

    // When tier opens we should download the status of solved assignments
    state.set(['user', 'assignmentsSolved'], services.localAssignments.getAll());
  }

  state.set(['course', 'currentSceneIndex'], input.sceneIndex);
}

export default setScene;
