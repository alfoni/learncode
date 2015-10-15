function saveRecording(input, state, output, services) {
  const courseId = state.get(['course', 'id']);
  const sceneIndex = state.get(['course', 'currentSceneIndex']);

  services.ajax.patch('/API/courses/' + courseId + '/scenes/' + sceneIndex, {
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
