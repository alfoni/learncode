function saveNewScene(input, state, output, services) {
  services.ajax.post('/API/courses/123/createScene', {
    name: input.sceneName
  })
  .then((scene) => {
    output.success({newScene: scene});
  })
  .catch(() => {
    output.error({
      message: 'Could not save sandbox files'
    });
  });
}

export default saveNewScene;
