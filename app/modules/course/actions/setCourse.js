function setCourse(input, state, output) {
  state.merge(['course'], input.course);

  state.set(['course', 'currentScene'], input.scene.index);
  state.set(['course', 'scenes', input.scene.index], input.scene);
  state.set(['course', 'scenes', input.scene.index, 'sandboxFiles'], input.scene.files);

  if (input.courseError || input.sceneError) {
    output.error();
  } else {
    output.success();
  }
}

export default setCourse;
