function setCourses({input, state}) {
  state.set(['techTree', 'courses'], input.courses);
}

export default setCourses;
