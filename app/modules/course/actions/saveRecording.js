function saveRecording(input, state, output, services) {
  const courseId = state.get(['course', 'id']);
  const sceneIndex = state.get(['course', 'currentSceneIndex']);
  const recording = services.recorder.getRecording();
  
  services.ajax.patch(`/API/courses/${courseId}/scenes/${sceneIndex}`, {
    recording: recording
  })
  .then(() => {
    output.success();
  })
  .catch(() => {
    output.error();
  });
}

export default saveRecording;
