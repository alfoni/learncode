function unlinkCourse({input, state}) {
  const selectedTierIndex = state.get(['techTree', 'selectedTierIndex']);

  const removingCourseIndex = state.get(['techTree', 'tiers', selectedTierIndex, 'courseDependencyList']).findIndex((course) => {
    return input.course.id === course.courseId;
  });

  state.get(['techTree', 'tiers', selectedTierIndex, 'courseDependencyList', removingCourseIndex, 'requires']).forEach((courseId) => {
    const requiresCourse = state.get(['techTree', 'tiers', selectedTierIndex, 'courseDependencyList']).find((course) => {
      return course.courseId === courseId;
    });
    const courseIndex = state.get(['techTree', 'tiers', selectedTierIndex, 'courseDependencyList'])
      .findIndex((dependencyCourse) => {
        return dependencyCourse.courseId === requiresCourse.courseId;
      });
    const removingCourseRequiredByIndex = state.get(['techTree', 'tiers', selectedTierIndex, 'courseDependencyList', courseIndex, 'requiredBy'])
      .findIndex((requiredByCourseId) => {
        return requiredByCourseId === input.courseId;
      });

    state.splice(
      ['techTree', 'tiers', selectedTierIndex, 'courseDependencyList', courseIndex, 'requiredBy'],
      removingCourseRequiredByIndex,
      1
    );
  });

  state.splice(['techTree', 'tiers', selectedTierIndex, 'courseDependencyList'], removingCourseIndex, 1);
}

export default unlinkCourse;
