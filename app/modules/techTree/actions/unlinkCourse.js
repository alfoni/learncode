function unlinkCourse({input, state}) {
  const selectedTierIndex = state.get(['techTree', 'selectedTierIndex']);

  const removingCourseIndex = state.get(['techTree', 'tiers', selectedTierIndex, 'courseDependencyList']).findIndex((course) => {
    return input.course.id === course.course.id;
  });

  state.get(['techTree', 'tiers', selectedTierIndex, 'courseDependencyList', removingCourseIndex, 'requires']).forEach((courseId) => {
    const requiresCourse = state.get(['techTree', 'tiers', selectedTierIndex, 'courseDependencyList']).find((course) => {
      return course.course.id === courseId;
    });
    const courseIndex = state.get(['techTree', 'tiers', selectedTierIndex, 'courseDependencyList'])
      .findIndex((dependencyCourse) => {
        return dependencyCourse.course.id === requiresCourse.course.id;
      });
    const removingCourseRequiredByIndex = state.get(['techTree', 'tiers', selectedTierIndex, 'courseDependencyList', courseIndex, 'requiredBy'])
      .findIndex((requiredByCourseId) => {
        return requiredByCourseId === input.course.id;
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
