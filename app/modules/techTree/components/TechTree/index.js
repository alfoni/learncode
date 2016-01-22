import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import selectedTier from '../../computed/selectedTier';

let Toolbar = null;
let CoursesOverview = null;
let styles = null;
let icons = null;
let Tiers = null;

@Cerebral({
  selectedTier: selectedTier,
  selectedCourse: ['techTree', 'selectedCourse'],
  courseDependencyMap: ['techTree', 'courseDependencyMap'],
  courses: ['techTree', 'courses'],
  user: ['user']
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
      Toolbar = require('common/components/Toolbar');
      Tiers = require('../Tiers');
      CoursesOverview =  require('../CoursesOverview');
      styles = require('./styles.css');
      icons = require('common/icons.css');
      this.setState({
        canRender: true
      });
    });
  }
  getCourse(courseId) {
    return this.props.courses.find((course) => {
      return course.id === courseId;
    });
  }
  renderLevels() {
    const renderedLevels = [];
    const levels = this.props.courseDependencyMap;

    levels.forEach((level, levelIndex) => {
      const levelBoxes = [];

      for (let x = 0; x < level.length; x++) {
        const course = level[x];
        const courseIndex = x;

        if (course && (course.topLine || course.bottomLine)) {
          levelBoxes.push(
            <div
              key={courseIndex}
              style={{borderTop: course ? '1px solid #5a7497' : ''}}
              className={styles.box}>
            </div>
          );
        } else if (level.sideLine) {
          levelBoxes.push(
            <div
              key={courseIndex}
              style={{borderTop: typeof course === 'number' ? '1px solid #5a7497' : ''}}
              className={styles.line}>
            </div>
          );
        } else if (level.centerLine) {
          levelBoxes.push(
            <div
              key={courseIndex}
              style={{
                borderLeft: typeof course === 'number' ? '1px solid #5a7497' : 'transparent'
              }}
              className={styles.centerLine}>
            </div>
          );
        } else {
          if (course) {
            if (this.getCourse(course.courseId).type === 'course') {
              x = x + 7; // slots a course takes up
              levelBoxes.push(
                <div
                  key={courseIndex}
                  className={styles.largeBox}>
                  {this.renderCourse(this.getCourse(course.courseId), courseIndex)}
                </div>
              );
            } else {
              levelBoxes.push(
                <div
                  key={courseIndex}
                  className={styles.smallBox}>
                  {this.renderTask(this.getCourse(course.courseId), courseIndex)}
                </div>
              );
              x = x + 3; // slots a task takes up
            }
          } else {
            levelBoxes.push(
              <div
                key={courseIndex}
                style={{backgroundColor: 'transparent'}}
                className={styles.box}>
              </div>
            );
          }
        }
      }

      if (level.sideLine) {
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
  canRemoveCourse(course) {
    if (!this.props.user.isAdmin) {
      return false;
    }

    const courseListObject = this.props.selectedTier.courseDependencyList.find((dependencyCourse) => {
      return dependencyCourse.courseId === course.id;
    });

    if (courseListObject && courseListObject.requiredBy.length > 0) {
      return false;
    }

    return true;
  }
  courseIsCompleted(course) {
    if (!this.props.user.assignmentsSolved[course.id]) {
      return false;
    }

    return this.props.user.assignmentsSolved[course.id].length === course.assignmentPoints.length + 1;
  }
  courseIsActive(course) {
    return false;
  }
  renderCourse(course, key) {
    const courseIsCompleted = this.courseIsCompleted(course);
    const courseIsActive = this.courseIsActive(course);

    return (
      <div
        key={key}
        className={`
          ${course.disabled ? styles.courseDisabled : styles.course}
          ${courseIsCompleted ? styles.courseCompleted : styles.course}
          ${courseIsActive ? styles.courseActive : styles.course}
        `}
        style={this.props.selectedCourse && this.props.selectedCourse.id === course.id ? {border: '3px solid #4CAF50'} : {}}
        onClick={(e) => this.onCourseClicked(e, course)}>
        <div className={`
          ${course.disabled ? styles.courseBadgeDisabled : styles.courseBadge}
          ${courseIsCompleted ? styles.courseBadgeCompleted : styles.courseBadge}
          ${courseIsActive ? styles.courseBadgeActive : styles.courseBadge}
        `}>
          <span className={icons.thumbUp}></span>
        </div>
        <div className={styles.titleWrapper}>
          <div className={`
            ${course.disabled ? styles.titleDisabled : styles.title}
            ${courseIsCompleted ? styles.titleCompleted : styles.title}
            ${courseIsActive ? styles.titleActive : styles.title}
          `}>
            {course.title}
            <span className={`
              ${course.disabled ? styles.titleDisabled : styles.subTitle}
              ${courseIsCompleted ? styles.titleCompleted : styles.subTitle}
              ${courseIsActive ? styles.titleActive : styles.subTitle}
            `}> {course.finishedPercent ? '(' + course.finishedPercent + ')' : ''}</span>
          </div>
        </div>
        {
          this.canRemoveCourse(course) ?
            <div
            onClick={(e) => {
              e.stopPropagation();
              this.props.signals.techTree.unlinkCourseClicked({course: course});
            }}
              className={styles.removeCourse}>
              X
            </div>
          :
            null
        }
      </div>
    );
  }
  renderTask(task, key) {
    const taskIsCompleted = this.courseIsCompleted(task);
    const taskIsActive = this.courseIsActive(task);

    return (
      <div
        key={key}
        className={`
          ${task.disabled ? styles.courseDisabled : styles.task}
          ${taskIsCompleted ? styles.courseCompleted : styles.task}
          ${taskIsActive ? styles.courseActive : styles.task}
        `}
        style={this.props.selectedCourse && this.props.selectedCourse.id === task.id ? {border: '3px solid #4CAF50'} : {}}
        onClick={(e) => this.onCourseClicked(e, task)}>
        <div className={`
          ${task.disabled ? styles.courseBadgeDisabled : styles.taskBadge}
          ${taskIsCompleted ? styles.courseBadgeCompleted : styles.taskBadge}
          ${taskIsActive ? styles.courseBadgeActive : styles.taskBadge}
        `}>
          <span className={icons.scene}></span>
        </div>
        <div className={styles.titleWrapper}>
          <div className={`
            ${task.disabled ? styles.titleDisabled : styles.title}
            ${taskIsCompleted ? styles.titleCompleted : styles.title}
            ${taskIsActive ? styles.titleActive : styles.title}
          `}>
            {task.title}
            <span className={`
              ${task.disabled ? styles.titleDisabled : styles.subTitle}
              ${taskIsCompleted ? styles.titleCompleted : styles.subTitle}
              ${taskIsActive ? styles.titleActive : styles.subTitle}
            `}> {task.finishedPercent ? '(' + task.finishedPercent + ')' : ''}</span>
          </div>
        </div>
        {
          this.canRemoveCourse(task) ?
            <div
              onClick={(e) => {
                e.stopPropagation();
                this.props.signals.techTree.unlinkCourseClicked({course: task});
              }}
              className={styles.removeCourse}>
              X
            </div>
          :
            null
        }
      </div>
    );
  }
  onCourseClicked(e, course) {
    e.stopPropagation();
    this.props.signals.techTree.courseClicked({course: course});
  }
  render() {
    if (this.state.canRender) {
      return (
        <div className={styles.wrapper} onClick={() => this.props.signals.techTree.wrapperClicked()}>
          <Toolbar/>
          <Tiers/>
          <div className={styles.techTreeWrapper}>
            {this.renderLevels()}
          </div>
          <CoursesOverview/>
        </div>
      );
    }

    return null;
  }
}

export default TechTree;
