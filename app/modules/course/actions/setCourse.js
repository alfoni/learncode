function setCourse(input, state, output) {
  state.merge(['course'], input.course);

  const scene = Object.assign({
    assignment: {
      description: '',
      code: ''
    }
  }, input.scene);
  state.set(['course', 'currentSceneIndex'], input.sceneIndex);
  state.set(['course', 'scenes', input.sceneIndex], scene);
  state.set(['course', 'scenes', input.sceneIndex, 'sandboxFiles'], scene.files);
  state.set(['course', 'scenes', input.sceneIndex, 'currentFileIndex'], 0);

  if (input.courseError || input.sceneError) {
    output.error();
  } else {
    output.success();
  }
}

export default setCourse;
