import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import styles from './TechTree.css';
import icons from 'common/icons.css';

const Intro = {
  title: 'Landingsside intro',
  type: 'course',
  finishedPercent: '0%',
  disabled: false,
  color: '#e57373' // Lys rød
};
const Stylesheet = {
  title: 'Stylesheet',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  color: '#E91E63' // Rosa
};
const Overskrifter = {
  title: 'Overskrifter',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  color: '#9C27B0' // Rosa
};
const ElementSelector = {
  title: 'CSS Element Selector',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  color: '#FFEB3B'
};
const Color = {
  title: 'Farge på tekst',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  color: '#3F51B5'
};
const Bilde = {
  title: 'Bilde',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  color: '#90CAF9'
};
const Landingsside1 = {
  title: 'Landingsside 1',
  type: 'course',
  finishedPercent: '0%',
  disabled: false,
  color: '#03A9F4'
};
const Landingsside2 = {
  title: 'Landingsside 2',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  color: '#FFCC80'
};
const Tekst = {
  title: 'Tekst',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  color: '#FFF'
};
const Landingsside3 = {
  title: 'Landingsside 3',
  type: 'course',
  finishedPercent: '0%',
  disabled: false,
  color: '#009688'
};
const Gradient = {
  title: 'Gradient',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  color: '#afa'
};
const Landingsside4 = {
  title: 'Landingsside 4',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  color: 'deeppink'
};

let dependencyList = [{
  course: Gradient,
  deps: [Color],
  dependentBy: []
}, {
  course: Intro,
  deps: [],
  dependentBy: [Bilde, Stylesheet, Overskrifter, ElementSelector, Color]
}, {
  course: Bilde,
  deps: [Intro],
  dependentBy: [Landingsside3, Tekst]
}, {
  course: Stylesheet,
  deps: [Intro],
  dependentBy: [Landingsside1]
}, {
  course: Overskrifter,
  deps: [Intro],
  dependentBy: [Landingsside1]
}, {
  course: ElementSelector,
  deps: [Intro],
  dependentBy: [Landingsside1]
}, {
  course: Color,
  deps: [Intro],
  dependentBy: [Landingsside1, Gradient]
}, {
  course: Landingsside1,
  deps: [Stylesheet, Overskrifter, ElementSelector, Color],
  dependentBy: [Landingsside3]
}, {
  course: Landingsside3,
  deps: [Landingsside1, Bilde],
  dependentBy: []
}, {
  course: Tekst,
  deps: [Bilde],
  dependentBy: []
}];

/* dependencyList = [{
  course: Gradient,
  deps: [],
  dependentBy: [Landingsside4, Landingsside3, Tekst]
}, {
  course: Landingsside4,
  deps: [Gradient],
  dependentBy: [Color, Bilde]
}, {
  course: Landingsside3,
  deps: [Gradient],
  dependentBy: [Tekst]
}, {
  course: Tekst,
  deps: [Gradient, Landingsside3],
  dependentBy: [Bilde]
}, {
  course: Color,
  deps: [Landingsside4],
  dependentBy: []
}, {
  course: Bilde,
  deps: [Tekst, Landingsside4],
  dependentBy: []
}]; */

@Cerebral({
})
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      canRender: false
    };
  }
  componentDidMount() {
    require.ensure([], (require) => {
      this.setState({
        canRender: true
      });
    });
  }
  createLevel(previousLevel, dependencies) {
    const newLevel = [];
    dependencies.forEach((course) => {
      previousLevel.forEach((dependency) => {
        if (course.deps.indexOf(dependency.course) >= 0 && newLevel.indexOf(course) < 0) {
          newLevel.push(course);
        }
      });
    });

    newLevel.forEach((course) => {
      newLevel.forEach((dependencyCourse, index) => {
        if (course.dependentBy.indexOf(dependencyCourse.course) >= 0) {
          newLevel.splice(index, 1);
        }
      });
    });

    return newLevel;
  }
  createDependencyTree() {
    const startPoints = dependencyList.filter((course) => {
      return !course.deps.length;
    });

    const levels = [startPoints];

    // Loop must run until none of the courses in a level has any dependentBy
    while (true) {
      const previousLevel = levels[levels.length - 1];
      let isLastLevel = true;

      previousLevel.forEach((course) => {
        if (course.dependentBy.length > 0) {
          isLastLevel = false;
        }
      });

      if (isLastLevel) {
        break;
      }

      levels.push(this.createLevel(previousLevel, dependencyList));
    }

    return levels;
  }
  sortLevels(dependencyTree) {
    const sortedDependencyTree = [];
    dependencyTree.forEach((level, index) => {
      const previousLevel = dependencyTree[index - 1];

      if (previousLevel) {
        level.forEach((course) => {
          const depsIndexes = [];
          previousLevel.forEach((previousLevelCourse, dependencyIndex) => {
            if (course.deps.indexOf(previousLevelCourse.course) >= 0) {
              depsIndexes.push(dependencyIndex);
            }
          });
          course.averageDepsIndex = depsIndexes.reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
          }) / depsIndexes.length;
        });
        level.sort((a, b) => {
          return a.averageDepsIndex - b.averageDepsIndex;
        });
      }
      sortedDependencyTree.push(level);
    });

    return sortedDependencyTree;
  }
  renderCourse(course, key) { // options: title, finishedPercent, disabled
    return (
      <div key={key} className={course.disabled ? styles.courseDisabled : styles.large}>
        <div className={styles.courseBadge}>
          <span className={icons.thumbUp}></span>
        </div>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>
            {course.title}
            <span className={styles.subTitle}> {course.finishedPercent ? '(' + course.finishedPercent + ')' : ''}</span>
          </div>
        </div>
      </div>
    );
  }
  renderTask(task, key) { // options: name, finishedPercent, disabled
    return (
      <div key={key} className={task.disabled ? styles.taskDisabled : styles.small}>
        <div className={styles.taskBadge}>
          <span className={icons.scene}></span>
        </div>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>
            {task.title}
            <span className={styles.subTitle}> {task.finishedPercent ? '(' + task.finishedPercent + ')' : ''}</span>
          </div>
        </div>
      </div>
    );
  }
  positionSlots(levels) {
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
  createSlots(levels) {
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
  getContainerSize(courseType) {
    if (!courseType) {
      return 0;
    }

    return courseType === 'course' ? 8 : 4; // including margins
  }
  addLinesMap(levelsMap) {
    const newMap = levelsMap.slice(0);
    levelsMap.forEach((currentLevel, levelIndex) => {
      const nextLevel = levelsMap[levelIndex + 1];
      const leftLines = [];
      const rightLines = [];
      const centerLine = [];
      leftLines.sideLines = true;
      rightLines.sideLines = true;
      centerLine.centerLine = true;
      // Add left lines
      currentLevel.forEach((course) => {
        if (course && leftLines.indexOf(course) < 0 && course.dependentBy.length) {
          leftLines.push(course);
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
          if (course && rightLines.indexOf(course) < 0) {
            rightLines.push(course);
          } else {
            rightLines.push(null);
          }
        });
      }

      newMap.splice((levelIndex * 4) + 1, 0, leftLines, centerLine, rightLines);
    });

    return newMap;
  }
  positionLineSlots(levelsMap) {
    levelsMap.forEach((level, levelIndex) => {
      if (level.sideLines) {
        const positionedLineSlots = level.slice(0);
        level.forEach((course, courseIndex) => {
          if (course) {
            // Position lines
            if (course.course.type === 'course') {
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
  getDepenencyIndexes(course, lineMap) {
    const relatedIndexes = [];
    lineMap.forEach((relatedCourse, index) => {
      if (relatedCourse && relatedCourse.dependentBy.indexOf(course) >= 0) {
        relatedIndexes.push(index);
      }
    });

    return relatedIndexes;
  }
  drawCenterLines(levels) {
    levels.forEach((level, currentLevelIndex) => {
      if (level.centerLine) {
        const leftLines = levels[currentLevelIndex - 1];
        const rightLines = levels[currentLevelIndex + 1];

        for (let x = 0; x < leftLines.length; x++) {
          if (!level[x]) {
            if (rightLines[x]) {
              const relatedLeftSideLineIndexes = this.getDepenencyIndexes(rightLines[x].course, leftLines);
              const minIndex = Math.min.apply(Math, relatedLeftSideLineIndexes); // Getting highest number in array
              const maxIndex = Math.max.apply(Math, relatedLeftSideLineIndexes); // Getting lowest number in array

              if (minIndex === maxIndex) { // Dependant by a single course
                if (minIndex > x) {
                  for (let y = x; y < minIndex; y++) { // Add the lines that are above the right-side course
                    if (!level[y]) {
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
  drawFutureLevelDependencyLines(levels) {
    levels.forEach((level, currentLevelIndex) => {
      if (level.centerLine) {
        const leftLines = levels[currentLevelIndex - 1];
        const rightLines = levels[currentLevelIndex + 1];

        for (let x = 0; x < leftLines.length; x++) {
          if (leftLines[x]) {
            const leftSideCourseDepsInNextLevel = rightLines.filter((course, index) => {
              if (!course) {
                return false;
              }

              return leftLines[x].dependentBy.indexOf(course.course) >= 0;
            });
            const leftSideCourseIsDepsInFutureLevels = leftLines[x].dependentBy.length === leftSideCourseDepsInNextLevel.length;

            // ('leftSideCourseIsDepsInFutureLevels', leftSideCourseIsDepsInFutureLevels);

            if (!leftSideCourseIsDepsInFutureLevels) {
              if (x < level.length / 2) { // If should draw line upwards or downwards
                for (let y = 0; y <= x; y++) { // Add the lines that are above the right-side course
                  level[y] = leftLines[x];
                }
                rightLines[0] = level[0];
              } else {
                for (let y = level.length - 1; y > x; y--) { // Add the lines that are above the right-side course
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
  drawPreviousLevelDependencyLines(levels) {
    levels.forEach((level, currentLevelIndex) => {
      if (level.centerLine) {
        const leftLines = levels[currentLevelIndex - 1];
        const rightLines = levels[currentLevelIndex + 1];

        for (let x = 0; x < rightLines.length; x++) {
          const isDependencyLine = x === 0;

          if (rightLines[x] && !isDependencyLine) {
            const rightSideCourseDepsInPreviousLevel = leftLines.filter((course, index) => {
              if (!course) {
                return false;
              }

              return rightLines[x].deps.indexOf(course.course) >= 0;
            });
            const rightSideCourseHasDepsInPreviousLevels = rightLines[x].deps.length === rightSideCourseDepsInPreviousLevel.length;

            if (!rightSideCourseHasDepsInPreviousLevels) {
              const rightLinesInPreviousLevel = levels[currentLevelIndex - 3];
              // Draw line upwards or downwards
              if (rightLinesInPreviousLevel[0] && rightLines[x].deps.indexOf(rightLinesInPreviousLevel[0].course) >= 0) {
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
  drawTopVerticalDependencyLine(levels) {
    levels.forEach((level, currentLevelIndex) => {
      if (!level.centerLine && !level.sideLines) {
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
  renderLevels() {
    const renderedLevels = [];
    let levels = this.createDependencyTree();
    levels = this.sortLevels(levels);
    levels = this.createSlots(levels);
    levels = this.positionSlots(levels);
    levels = this.addLinesMap(levels);
    levels = this.positionLineSlots(levels);
    levels = this.drawCenterLines(levels);
    levels = this.drawFutureLevelDependencyLines(levels);
    levels = this.drawPreviousLevelDependencyLines(levels);
    levels = this.drawTopVerticalDependencyLine(levels);

    levels.forEach((level, levelIndex) => {
      const levelBoxes = [];

      for (let x = 0; x < level.length; x++) {
        const course = level[x];
        const courseIndex = x

        const depsBoxes = [];

        if (course && typeof course.position !== 'number') {
          if (course.deps) {
            course.deps.forEach((depsCourse, index) => {
              depsBoxes.push(
                <div
                  key={index}
                  style={{backgroundColor: depsCourse.color}}
                  className={styles.depsBox}>
                </div>
              );
            });
          }
        }

        if (course && (course.topLine || course.bottomLine)) {
          levelBoxes.push(
            <div
              key={courseIndex}
              style={{borderTop: course ? '1px solid ' + 'rgba(50, 50, 65, 1)' : ''}}
              className={styles.box}>
            </div>
          );
        } else if (level.sideLines) {
          levelBoxes.push(
            <div
              key={courseIndex}
              style={{borderTop: course ? '1px solid ' + 'rgba(50, 50, 65, 1)' : ''}}
              className={styles.line}>
            </div>
          );
        } else if (level.centerLine) {
          levelBoxes.push(
            <div
              key={courseIndex}
              style={{
                borderLeft: course ? '1px solid rgba(50, 50, 65, 1)' : 'transparent'
              }}
              className={styles.centerLine}>
            </div>
          );
        } else {
          if (course) {
            if (course.course.type === 'course') {
              x = x + 7;
              levelBoxes.push(
                <div
                  key={courseIndex}
                  // style={{backgroundColor: course  ? course.course.color : 'transparent'}}
                  className={styles.largeBox}>
                  {this.renderCourse(course.course, courseIndex)}
                  {/* depsBoxes */}
                </div>
              );
            } else {
              levelBoxes.push(
                <div
                  key={courseIndex}
                  // style={{backgroundColor: course  ? course.course.color : 'transparent'}}
                  className={styles.smallBox}>
                  {this.renderTask(course.course, courseIndex)}
                  {/* depsBoxes */}
                </div>
              );
              x = x + 3;
            }
          } else {
            levelBoxes.push(
              <div
                key={courseIndex}
                style={{backgroundColor: course  ? course.course.color : 'transparent'}}
                className={styles.box}>
                {course ? course.course.title : ''}
                {depsBoxes}
              </div>
            );
          }
        }
      }

      if (level.sideLines) {
        renderedLevels.push(
          <div key={levelIndex} className={styles.linesLevel}>{levelBoxes}</div>
        );
      } else if (level.centerLine) {
        renderedLevels.push(
          <div key={levelIndex} className={styles.centerLineLevel}>{levelBoxes}</div>
        );
      } else {
        renderedLevels.push(
          <div key={levelIndex} className={styles.boxLevel}>{levelBoxes}</div>
        );
      }
    });

    return renderedLevels;
  }
  render() {
    if (this.state.canRender) {
      return (
        <div className={styles.wrapper}>
          {this.renderLevels()}
        </div>
      );
    }

    return null;
  }
}

export default Home;
