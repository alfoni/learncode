function setSandboxCourse({state, input}) {
  state.merge(['course'], input.sandboxCourse);
  state.set(['course', 'scenes', 0, 'sandboxFiles'], input.sandboxCourse.scenes[0].files);
  state.set(['course', 'scenes', 0, 'currentFileIndex'], 0);
}

export default setSandboxCourse;
