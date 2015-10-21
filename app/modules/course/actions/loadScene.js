function loadScene(input, state, output) {
  const courseId = state.get(['course', 'id']);
  
  fetch(`/API/courses/${input.courseId || courseId}/scenes/${input.sceneIndex || 0}`)
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
