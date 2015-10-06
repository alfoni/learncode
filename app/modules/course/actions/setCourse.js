function setCourse(input, state, output) {
  state.merge(['course'], input.course);

  state.set(['course', 'currentSceneIndex'], input.scene.index);
  state.set(['course', 'scenes', input.scene.index], input.scene);

  output.success({
    courseSet: true
  });
}

export default setCourse;
