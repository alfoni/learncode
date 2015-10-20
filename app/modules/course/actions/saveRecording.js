function saveRecording(input, state, output, services) {
  const courseId = state.get(['course', 'id']);
  const sceneIndex = state.get(['course', 'currentSceneIndex']);

  services.ajax.put(`/API/courses/${courseId}/scenes/${sceneIndex}/recording`, {
    recording: services.recorder.getRecording()
  })
  .then(() => {
    output.success();
  })
  .catch(() => {
    output.error();
  });
}

export default saveRecording;
