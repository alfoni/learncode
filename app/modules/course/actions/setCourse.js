function setCourse({input, state}) {
  state.merge(['course'], input.course);
  state.set(['course', 'scenesList'], input.course.scenes.map((scene) => {
    return {
      name: scene.name,
      assignmentsCount: scene.assignments.length
    };
  }));
}

export default setCourse;
