function saveNewScene(input, state, output, services) {
  const courseId = state.get(['course', 'id']);

  services.ajax.post(`/API/courses/${courseId}/scenes`, {
    name: state.get(['course', 'newSceneName'])
  })
  .then((scene) => {
    output.success({scene: scene});
  })
  .catch(() => {
    output.error({
      message: 'Could not save sandbox files'
    });
  });
}

export default saveNewScene;
