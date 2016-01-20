function getCourse(courseId, courseDependencyList) {
  return courseDependencyList.find((course) => {
    return course.course.id === courseId;
  });
}

function createLevel(previousLevel, dependencies) {
  const newLevel = [];
  dependencies.forEach((course) => {
    previousLevel.forEach((dependency) => {
      if (course.requires.indexOf(dependency.course.id) >= 0 && newLevel.indexOf(course) < 0) {
        newLevel.push(course);
      }
    });
  });

  newLevel.forEach((course) => {
    newLevel.forEach((dependencyCourse, index) => {
      if (course.requiredBy.indexOf(dependencyCourse.course.id) >= 0) {
        newLevel.splice(index, 1);
      }
    });
  });

  return newLevel;
}

function createDependencyTree(courseDependencyList) {
  const startPoints = courseDependencyList.filter((course) => {
    return !course.requires.length;
  });

  const levels = [startPoints];

  // Loop must run until none of the courses in a level has any requiredBy
  while (true) {
    const previousLevel = levels[levels.length - 1];
    let isLastLevel = true;

    previousLevel.forEach((course) => {
      if (course.requiredBy.length > 0) {
        isLastLevel = false;
      }
    });

    if (isLastLevel) {
      break;
    }

    levels.push(createLevel(previousLevel, courseDependencyList));
  }

  return levels;
}

function sortLevels(dependencyTree) {
  const sortedDependencyTree = [];
  dependencyTree.forEach((level, index) => {
    const previousLevel = dependencyTree[index - 1];
    const sortedLevel = [];

    if (previousLevel) {
      level.forEach((course) => {
        const requiresIndexes = [];
        previousLevel.forEach((previousLevelCourse, dependencyIndex) => {
          if (course.requires.indexOf(previousLevelCourse.course.id) >= 0) {
            requiresIndexes.push(dependencyIndex);
          }
        });
        sortedLevel.push({
          course: course,
          averagerequiresIndex: requiresIndexes.reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
          }) / requiresIndexes.length
        });
      });
      sortedLevel.sort((a, b) => {
        return a.averagerequiresIndex - b.averagerequiresIndex;
      });
      sortedDependencyTree.push(sortedLevel.map((course) => {
        return course.course;
      }));
    } else {
      sortedDependencyTree.push(level);
    }
  });

  return sortedDependencyTree;
}

function positionSlots(levels) {
  const positionedLevels = levels;
  positionedLevels.forEach((level) => {
    const currentLevelSize = level.reduce((previousValue, currentValue) => {
      return currentValue ? previousValue + 1 : previousValue;
    }, 0);
    const maximumSlots = 20;

    for (let x = 0; x < (maximumSlots - currentLevelSize) / 2; x++) {
      level.unshift(null);
      level.splice(level.length - 1, 1);
    }
  });

  return positionedLevels;
}

function createSlots(levels) {
  const map = [];
  levels.forEach((level) => {
    const levelMap = [];
    level.forEach((course) => {
      const courseSize = course.course.type === 'course' ? 8 : 4;

      for (let x = 0; x < courseSize; x++) {
        levelMap.push(course);
      }
    });
    const maximumSlots = 20;

    for (let x = levelMap.length; x < maximumSlots; x++) {
      levelMap.push(null);
    }
    levelMap.splice(0, 0, null); // For line that goes to another level through the top
    levelMap.push(null); // For line that goes to another level through the bottom
    map.push(levelMap);
  });

  return map;
}

function addLinesMap(levelsMap) {
  const newMap = levelsMap.slice(0);
  levelsMap.forEach((currentLevel, levelIndex) => {
    const nextLevel = levelsMap[levelIndex + 1];
    const leftLines = [];
    const rightLines = [];
    const centerLine = [];
    leftLines.sideLine = true;
    rightLines.sideLine = true;
    centerLine.centerLine = true;
    // Add left lines
    currentLevel.forEach((course) => {
      if (course && leftLines.indexOf(course.course.id) <= 0 && course.requiredBy.length) {
        leftLines.push(course.course.id);
      } else {
        leftLines.push(null);
      }
    });

    // Add center lines frame
    currentLevel.forEach(() => {
      centerLine.push(null);
    });
    // Add right lines
    if (nextLevel) {
      nextLevel.forEach((course) => {
        if (course && rightLines.indexOf(course.course.id) <= 0) {
          rightLines.push(course.course.id);
        } else {
          rightLines.push(null);
        }
      });
    }

    newMap.splice((levelIndex * 4) + 1, 0, leftLines, centerLine, rightLines);
  });

  return newMap;
}

function positionLineSlots(levelsMap, courseDependencyList) {
  levelsMap.forEach((level, levelIndex) => {
    if (level.sideLine) {
      const positionedLineSlots = level.slice(0);
      level.forEach((courseId, courseIndex) => {
        if (typeof courseId === 'number') {
          // Position lines
          if (getCourse(courseId, courseDependencyList).course.type === 'course') {
            positionedLineSlots.splice(courseIndex + 1, 4);
            positionedLineSlots.splice(courseIndex, 0, null, null, null, null);
          } else {
            positionedLineSlots.splice(courseIndex + 1, 2);
            positionedLineSlots.splice(courseIndex, 0, null, null);
          }
        }
      });
      levelsMap[levelIndex].splice(0, levelsMap[levelIndex].length, ...positionedLineSlots);
    }
  });

  return levelsMap;
}

function getDepenencyIndexes(courseId, lines, courseDependencyList) {
  const relatedIndexes = [];
  lines.forEach((relatedCourseId, index) => {
    if (typeof relatedCourseId === 'number' && getCourse(relatedCourseId, courseDependencyList).requiredBy.indexOf(courseId) >= 0) {
      relatedIndexes.push(index);
    }
  });

  return relatedIndexes;
}

function drawCenterLines(levels, courseDependencyList) {
  levels.forEach((level, currentLevelIndex) => {
    if (level.centerLine) {
      const leftLines = levels[currentLevelIndex - 1];
      const rightLines = levels[currentLevelIndex + 1];

      for (let x = 0; x < leftLines.length; x++) {
        if (typeof level[x] !== 'number') {
          if (typeof rightLines[x] === 'number') {
            const relatedLeftSideLineIndexes = getDepenencyIndexes(rightLines[x], leftLines, courseDependencyList);
            const minIndex = Math.min.apply(Math, relatedLeftSideLineIndexes); // Getting highest number in array
            const maxIndex = Math.max.apply(Math, relatedLeftSideLineIndexes); // Getting lowest number in array

            if (minIndex === maxIndex) { // Dependant by a single course
              if (minIndex > x) {
                for (let y = x; y < minIndex; y++) { // Add the lines that are above the right-side course
                  if (typeof level[y] !== 'number') {
                    level[y] = rightLines[x];
                  }
                }
              } else {
                for (let y = minIndex; y < x; y++) { // Add the lines that are below the right-side course
                  level[y] = rightLines[x];
                }
              }
            } else { // Dependent by multiple courses
              for (let y = minIndex; y < maxIndex; y++) { // Draw line from lowest positioned dependency to hightest positioned dependecy
                level[y] = rightLines[x];
              }
            }
          }
        }
      }
    }
  });

  return levels;
}

function drawFutureLevelDependencyLines(levels, courseDependencyList) {
  levels.forEach((level, currentLevelIndex) => {
    if (level.centerLine) {
      const leftLines = levels[currentLevelIndex - 1];
      const rightLines = levels[currentLevelIndex + 1];

      for (let x = 0; x < leftLines.length; x++) {
        const currentCourse = getCourse(leftLines[x], courseDependencyList);

        if (typeof leftLines[x] === 'number') {
          const leftSideCourserequiresInNextLevel = rightLines.filter((courseId) => {
            if (!courseId) {
              return false;
            }

            return currentCourse.requiredBy.indexOf(courseId) >= 0;
          });
          const leftSideCourseIsrequiresInFutureLevels = currentCourse.requiredBy.length === leftSideCourserequiresInNextLevel.length;

          if (!leftSideCourseIsrequiresInFutureLevels) {
            if (x < level.length / 2) { // If should draw line upwards or downwards
              for (let y = 0; y <= x; y++) { // Add the lines that are above the right-side course
                level[y - 1] = leftLines[x];
              }
              rightLines[0] = level[0];
            } else {
              for (let y = level.length - 1; y >= x; y--) { // Add the lines that are above the right-side course
                level[y] = leftLines[x];
              }
              rightLines[level.length] = level[level.length - 1];
            }
          }
        }
      }
    }
  });

  return levels;
}

function drawPreviousLevelDependencyLines(levels, courseDependencyList) {
  levels.forEach((level, currentLevelIndex) => {
    if (level.centerLine) {
      const leftLines = levels[currentLevelIndex - 1];
      const rightLines = levels[currentLevelIndex + 1];

      for (let x = 0; x < rightLines.length; x++) {
        const isDependencyLine = x === 0 || x === level.length;
        const currentCourse = getCourse(rightLines[x], courseDependencyList);

        if (typeof rightLines[x] === 'number' && !isDependencyLine) {
          const rightSideCourseRequiresInPreviousLevel = leftLines.filter((courseId) => {
            if (typeof courseId !== 'number') {
              return false;
            }

            return currentCourse.requires.indexOf(courseId) >= 0;
          });

          // right side course has requires in previous levels
          if (currentCourse.requires.length !== rightSideCourseRequiresInPreviousLevel.length) {
            const rightLinesInPreviousLevel = levels[currentLevelIndex - 3];
            // Draw line upwards or downwards
            if (rightLinesInPreviousLevel[0] && currentCourse.requires.indexOf(rightLinesInPreviousLevel[0]) >= 0) {
              for (let y = 0; y < x; y++) {
                level[y] = rightLines[x];
              }
              leftLines[0] = level[0];
            } else {
              for (let y = level.length - 1; y >= x; y--) {
                level[y] = rightLines[x];
              }
              leftLines[level.length] = level[level.length - 1];
            }
          }
        }
      }
    }
  });

  return levels;
}

function drawTopVerticalDependencyLine(levels) {
  levels.forEach((level, currentLevelIndex) => {
    if (!level.centerLine && !level.sideLine) {
      const leftLines = levels[currentLevelIndex - 1];
      const rightLines = levels[currentLevelIndex + 1];

      if (leftLines && leftLines[0] && rightLines && rightLines[0]) {
        level[0] = {
          topLine: true,
          course: rightLines[0]
        };
      }

      if (leftLines && leftLines[rightLines.length - 1] && rightLines && rightLines[rightLines.length - 1]) {
        level[rightLines.length - 1] = {
          bottomLine: true,
          course: rightLines[rightLines.length - 1]
        };
      }
    }
  });

  return levels;
}

function createDependencySlotTree({state}) {
  const currentTierIndex = state.get(['techTree', 'selectedTierIndex']);
  let courseDependencyList = [];

  if (typeof currentTierIndex === 'number') {
    courseDependencyList = state.get(['techTree', 'tiers', currentTierIndex, 'courseDependencyList']);
  }

  let levels = createDependencyTree(courseDependencyList);
  levels = sortLevels(levels);
  levels = createSlots(levels);
  levels = positionSlots(levels);
  levels = addLinesMap(levels);
  levels = positionLineSlots(levels, courseDependencyList);
  levels = drawCenterLines(levels, courseDependencyList);
  levels = drawFutureLevelDependencyLines(levels, courseDependencyList);
  levels = drawPreviousLevelDependencyLines(levels, courseDependencyList);
  levels = drawTopVerticalDependencyLine(levels);

  state.set(['techTree', 'courseDependencyMap'], levels);
}

export default createDependencySlotTree;
