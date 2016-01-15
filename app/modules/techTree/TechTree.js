import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import styles from './TechTree.css';
import icons from 'common/icons.css';

let CoursesOverview = null;

@Cerebral({
  courseDependencyList: ['techTree', 'courseDependencyList']
})
class TechTree extends React.Component {
  constructor() {
    super();
    this.state = {
      canRender: false
    };
  }
  componentDidMount() {
    require.ensure([], (require) => {
      CoursesOverview =  require('./components/CoursesOverview');
      this.setState({
        canRender: true
      });
    });
  }
  getCourse(courseId) {
    return this.props.courseDependencyList.find((course) => {
      return course.course.id === courseId;
    });
  }
  createLevel(previousLevel, dependencies) {
    const newLevel = [];
    dependencies.forEach((course) => {
      previousLevel.forEach((dependency) => {
        if (course.requires.indexOf(dependency.course.id) >= 0 && newLevel.indexOf(course.id) < 0) {
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
  createDependencyTree() {
    const startPoints = this.props.courseDependencyList.filter((course) => {
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

      levels.push(this.createLevel(previousLevel, this.props.courseDependencyList));
    }

    return levels;
  }
  sortLevels(dependencyTree) {
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
  positionLineSlots(levelsMap) {
    levelsMap.forEach((level, levelIndex) => {
      if (level.sideLines) {
        const positionedLineSlots = level.slice(0);
        level.forEach((courseId, courseIndex) => {
          if (typeof courseId === 'number') {
            // Position lines
            if (this.getCourse(courseId).course.type === 'course') {
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
  getDepenencyIndexes(courseId, lines) {
    const relatedIndexes = [];
    lines.forEach((relatedCourseId, index) => {
      if (typeof relatedCourseId === 'number' && this.getCourse(relatedCourseId).requiredBy.indexOf(courseId) >= 0) {
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
            if (typeof rightLines[x] === 'number') {
              const relatedLeftSideLineIndexes = this.getDepenencyIndexes(rightLines[x], leftLines);
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
          const currentCourse = this.getCourse(leftLines[x]);

          if (typeof leftLines[x] === 'number') {
            const leftSideCourserequiresInNextLevel = rightLines.filter((courseId) => {
              if (!courseId) {
                return false;
              }

              return currentCourse.requiredBy.indexOf(courseId) >= 0;
            });
            const leftSideCourseIsrequiresInFutureLevels = currentCourse.requiredBy.length === leftSideCourserequiresInNextLevel.length;

            // ('leftSideCourseIsrequiresInFutureLevels', leftSideCourseIsrequiresInFutureLevels);

            if (!leftSideCourseIsrequiresInFutureLevels) {
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
          const currentCourse = this.getCourse(rightLines[x]);

          if (rightLines[x] && !isDependencyLine) {
            const rightSideCourseRequiresInPreviousLevel = leftLines.filter((courseId) => {
              if (!courseId) {
                return false;
              }

              return currentCourse.requires.indexOf(courseId) >= 0;
            });

            // right side course has requires in previous levels
            if (!currentCourse.requires.length === rightSideCourseRequiresInPreviousLevel.length) {
              const rightLinesInPreviousLevel = levels[currentLevelIndex - 3];
              // Draw line upwards or downwards
              if (rightLinesInPreviousLevel[0] && rightLines[x].requires.indexOf(rightLinesInPreviousLevel[0].course.id) >= 0) {
                for (let y = 0; y < x; y++) {
                  level[y] = rightLines[x].id;
                }
                leftLines[0] = level[0].id;
              } else {
                for (let y = level.length - 1; y >= x; y--) {
                  level[y] = rightLines[x].id;
                }
                leftLines[level.length] = level[level.length - 1].id;
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
        const courseIndex = x;

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
              style={{borderTop: typeof course === 'number' ? '1px solid ' + 'rgba(50, 50, 65, 1)' : ''}}
              className={styles.line}>
            </div>
          );
        } else if (level.centerLine) {
          levelBoxes.push(
            <div
              key={courseIndex}
              style={{
                borderLeft: typeof course === 'number' ? '1px solid rgba(50, 50, 65, 1)' : 'transparent'
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
                  className={styles.largeBox}>
                  {this.renderCourse(course.course, courseIndex)}
                </div>
              );
            } else {
              levelBoxes.push(
                <div
                  key={courseIndex}
                  className={styles.smallBox}>
                  {this.renderTask(course.course, courseIndex)}
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
  renderCourse(course, key) {
    return (
      <div
        key={key}
        className={course.disabled ? styles.courseDisabled : styles.large}
        onClick={() => this.props.signals.techTree.onCourseClicked({course: course})}>
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
  renderTask(task, key) {
    return (
      <div
        key={key}
        className={task.disabled ? styles.taskDisabled : styles.small}
        onClick={() => this.props.signals.techTree.onCourseClicked({course: task})}>
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
  render() {
    if (this.state.canRender) {
      return (
        <div className={styles.wrapper}>
          {this.renderLevels()}
          <CoursesOverview/>
        </div>
      );
    }

    return null;
  }
}

export default TechTree;
