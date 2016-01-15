function linkCourses({input, state}) {
  const selectedCourse = state.get(['techTree', 'selectedCourse']);
  const selectedCourseIndex = state.get(['techTree', 'courseDependencyList']).findIndex((dependencyCourse) => {
    return selectedCourse.id === dependencyCourse.course.id;
  });
  const dependencyCourseIndex = state.get(['techTree', 'courseDependencyList']).findIndex((dependencyCourse) => {
    return input.course.id === dependencyCourse.course.id;
  });

  let selectedCourseLevelIndex = null;
  let linkingCourseLevelIndex = null;
  let selectedCourseIsWithinOneLevel = false;

  state.get(['techTree', 'courseDependencyMap']).forEach((level, levelIndex) => {
    if (!level.centerLine && !level.sideLine) {
      const selectedCourseExistsInLevel = level.find((course) => {
        if (!course) {
          return false;
        }

        return course.course.id === selectedCourse.id;
      });
      const linkingCourseExistsInLevel = level.find((course) => {
        if (!course) {
          return false;
        }

        return course.course.id === input.course.id;
      });

      if (selectedCourseExistsInLevel) {
        selectedCourseLevelIndex = levelIndex;
      }

      if (linkingCourseExistsInLevel) {
        linkingCourseLevelIndex = levelIndex;
      }
    }
  });

  if (selectedCourseLevelIndex > linkingCourseLevelIndex) {
    selectedCourseIsWithinOneLevel = selectedCourseLevelIndex - linkingCourseLevelIndex === 1;
  } else {
    selectedCourseIsWithinOneLevel = linkingCourseLevelIndex - selectedCourseLevelIndex === 1;
  }

  if (selectedCourseIsWithinOneLevel) {
    if (selectedCourseIndex > dependencyCourseIndex) {
      state.push(['techTree', 'courseDependencyList', dependencyCourseIndex, 'requiredBy'], selectedCourse.id);
      state.push(['techTree', 'courseDependencyList', selectedCourseIndex, 'requires'], input.course.id);
    } else {
      state.push(['techTree', 'courseDependencyList', dependencyCourseIndex, 'requires'], selectedCourse.id);
      state.push(['techTree', 'courseDependencyList', selectedCourseIndex, 'requiredBy'], input.course.id);
    }
  }
}

export default linkCourses;
