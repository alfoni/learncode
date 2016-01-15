function setCourseDependency({state, input}) {
  const selectedCourse = state.get(['techTree', 'selectedCourse']);

  if (!selectedCourse) {
    // Starting point
    state.push(['techTree', 'courseDependencyList'], {
      course: input.course,
      requires: [],
      requiredBy: []
    });
  } else {
    state.push(['techTree', 'courseDependencyList'], {
      course: input.course,
      requires: [selectedCourse.id],
      requiredBy: []
    });

    const selectedCourseIndex = state.get(['techTree', 'courseDependencyList']).findIndex((course) => {
      return course.course.id === selectedCourse.id;
    });

    state.push(['techTree', 'courseDependencyList', selectedCourseIndex, 'requiredBy'], input.course.id);
  }
}

export default setCourseDependency;
