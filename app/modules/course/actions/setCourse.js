function setCourse(input, state) {
  state.merge(['course'], input.course);
  state.set(['course', 'scenesList'], input.course.scenes.map((scene) => scene.name));
}

export default setCourse;
