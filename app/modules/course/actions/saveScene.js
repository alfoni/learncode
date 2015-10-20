function saveScene(input, state, output, services) {
  const courseId = state.get(['course', 'id']);
  const sceneIndex = state.get(['course', 'currentSceneIndex']);
  const files = state.get(['course', 'scenes', sceneIndex, 'sandboxFiles']);

  services.ajax.patch(`/API/courses/${courseId}/scenes/${sceneIndex}`, {
    files: files
  })
  .then(() => {
    output.success();
  })
  .catch(() => {
    output.error();
  });
}

export default saveScene;
