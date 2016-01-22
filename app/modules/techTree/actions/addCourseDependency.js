function setCourseDependency({state, input}) {
  const selectedTierIndex = state.get(['techTree', 'selectedTierIndex']);
  const selectedCourse = state.get(['techTree', 'selectedCourse']);

  if (!selectedCourse) {
    // Starting point
    state.push(['techTree', 'tiers', selectedTierIndex, 'courseDependencyList'], {
      courseId: input.course.id,
      requires: [],
      requiredBy: []
    });
  } else {
    state.push(['techTree', 'tiers', selectedTierIndex, 'courseDependencyList'], {
      courseId: input.course.id,
      requires: [selectedCourse.id],
      requiredBy: []
    });

    const selectedCourseIndex = state.get(['techTree', 'tiers', selectedTierIndex, 'courseDependencyList']).findIndex((course) => {
      return course.courseId === selectedCourse.id;
    });

    state.push(['techTree', 'tiers', selectedTierIndex, 'courseDependencyList', selectedCourseIndex, 'requiredBy'], input.course.id);
  }
}

export default setCourseDependency;
