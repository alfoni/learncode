function loadScene(input, state, output) {
  fetch(`/API/courses/${input.courseId}/scenes/${input.sceneIndex || 0}`)
    .then((response) => {
      if (response.status !== 200) {
        output({
          sceneError: response.toString()
        });
      }

      return response.json();
    }
  ).then((scene) => {
    output({
      scene: scene
    });
  }).catch((err) => {
    output({
      sceneError: err.toString()
    });
  });
}

export default loadScene;
