function setCourses({input, state}) {
  state.set(['courses', 'courses'], input.courses);
}

export default setCourses;
