function linkCourses({input, state}) {
  const selectedTierIndex = state.get(['techTree', 'selectedTierIndex']);
  const selectedCourse = state.get(['techTree', 'selectedCourse']);
  const selectedCourseIndex = state.get(['techTree', 'tiers', selectedTierIndex, 'courseDependencyList']).findIndex((dependencyCourse) => {
    return selectedCourse.id === dependencyCourse.course.id;
  });
  const dependencyCourseIndex = state.get(['techTree', 'tiers', selectedTierIndex, 'courseDependencyList']).findIndex((dependencyCourse) => {
    return input.course.id === dependencyCourse.course.id;
  });

  let selectedCourseLevelIndex = null;
  let linkingCourseLevelIndex = null;
  let selectedCourseIsWithinOneLevel = false;
  let levelIndex = 0;

  state.get(['techTree', 'courseDependencyMap']).forEach((level) => {
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

      levelIndex++;
    }
  });

  if (selectedCourseLevelIndex > linkingCourseLevelIndex) {
    selectedCourseIsWithinOneLevel = selectedCourseLevelIndex - linkingCourseLevelIndex === 1 ||
    selectedCourseLevelIndex - linkingCourseLevelIndex === 2;
  } else {
    selectedCourseIsWithinOneLevel = linkingCourseLevelIndex - selectedCourseLevelIndex === 1 ||
    linkingCourseLevelIndex - selectedCourseLevelIndex === 2;
  }

  if (selectedCourseIsWithinOneLevel) {
    if (selectedCourseIndex > dependencyCourseIndex) {
      if (state.get(['techTree', 'tiers', selectedTierIndex, 'courseDependencyList', dependencyCourseIndex, 'requiredBy']).indexOf(selectedCourse.id) < 0) {
        state.push(['techTree', 'tiers', selectedTierIndex, 'courseDependencyList', dependencyCourseIndex, 'requiredBy'], selectedCourse.id);
      }

      if (state.get(['techTree', 'tiers', selectedTierIndex, 'courseDependencyList', selectedCourseIndex, 'requires']).indexOf(input.course.id) < 0) {
        state.push(['techTree', 'tiers', selectedTierIndex, 'courseDependencyList', selectedCourseIndex, 'requires'], input.course.id);
      }
    } else {
      if (state.get(['techTree', 'tiers', selectedTierIndex, 'courseDependencyList', dependencyCourseIndex, 'requires']).indexOf(selectedCourse.id) < 0) {
        state.push(['techTree', 'tiers', selectedTierIndex, 'courseDependencyList', dependencyCourseIndex, 'requires'], selectedCourse.id);
      }

      if (state.get(['techTree', 'tiers', selectedTierIndex, 'courseDependencyList', selectedCourseIndex, 'requiredBy']).indexOf(input.course.id) < 0) {
        state.push(['techTree', 'tiers', selectedTierIndex, 'courseDependencyList', selectedCourseIndex, 'requiredBy'], input.course.id);
      }
    }
  }
}

export default linkCourses;
