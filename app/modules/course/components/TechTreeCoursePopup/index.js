import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';
import icons from 'common/icons.css';

const containerMarginLeft = -337; // from CSS
const containerWidth = 685 + containerMarginLeft; // from CSS
const containerHeight = 210; // from CSS
const rightMargin = 30;
const leftMargin = 10;
const arrowMarginLeft = 327;

@Cerebral({
  openedCourse: ['techTree', 'openedCourse'],
  user: ['user']
})
class TechTreeCoursePopup extends React.Component {
  constructor() {
    super();
  }
  getLeftPosition(originalPosition) {
    if (originalPosition + containerMarginLeft - leftMargin <= leftMargin) {
      return leftMargin - containerMarginLeft;
    }

    if (originalPosition + containerWidth + rightMargin >= document.body.offsetWidth) {
      return originalPosition - (originalPosition + containerWidth + rightMargin - document.body.offsetWidth);
    }

    return originalPosition;
  }
  getLeftArrowPosition(originalWrapperPosition) {
    if (originalWrapperPosition - this.getLeftPosition(originalWrapperPosition) < 0) {
      return arrowMarginLeft + originalWrapperPosition - this.getLeftPosition(originalWrapperPosition);
    }

    if (originalWrapperPosition - this.getLeftPosition(originalWrapperPosition) > 0) {
      return arrowMarginLeft + originalWrapperPosition - this.getLeftPosition(originalWrapperPosition);
    }

    return arrowMarginLeft;
  }
  getProgressPercent() {
    const course = this.props.openedCourse.course;

    if (!this.props.user.assignmentsSolved[course.id]) {
      return 0;
    }

    const solvedAssignmentsCount = Object.keys(this.props.user.assignmentsSolved[course.id]).reduce((total, key) => {
      return total + this.props.user.assignmentsSolved[course.id][key];
    }, 0);

    return Math.round((solvedAssignmentsCount / this.getTotalAssignments(course)) * 100);
  }
  getTotalAssignments(course) {
    return course.scenes.map((scene) => {
      return scene.assignments.length;
    }).reduce((total, assignments) => {
      return total + assignments;
    });
  }
  openCourse() {
    this.props.signals.course.opened({
      courseId: this.props.openedCourse.course.id.toString(),
      sceneIndex: '0'
    });
  }
  renderButton() {
    if (this.props.openedCourse.courseIsStarted) {
      return (
        <button className={styles.button} onClick={() => this.openCourse()}>
          <span className={`${icons.play} ${styles.buttonIcon}`}></span>
          Fortsett
        </button>
      );
    }

    if (this.props.openedCourse.courseIsActive) {
      return (
        <button className={styles.button} onClick={() => this.openCourse()}>
          <span className={`${icons.play} ${styles.buttonIcon}`}></span>
          Start
        </button>
      );
    }

    if (this.props.openedCourse.courseIsCompleted) {
      return (
        <button className={styles.buttonCompleted} onClick={() => this.openCourse()}>
          <span className={`${icons.play} ${styles.buttonIcon}`}></span>
          Start på nytt
        </button>
      );
    }

    return null;
  }
  renderIcon() {
    const course = this.props.openedCourse;

    if (!course.courseIsCompleted && !course.courseIsActive && !course.courseIsStarted) {
      return (
        <div className={styles.iconDisabled}>
          <span className={icons.lock}></span>
        </div>
      );
    }

    if (course.course.type === 'course') {
      return (
        <div className={styles.icon}>
          <span className={icons.school}></span>
        </div>
      );
    }

    return (
      <div className={styles.icon}>
        <span className={icons.light}></span>
      </div>
    );
  }
  renderTopArrow() {
    const leftArrowPosition = this.getLeftArrowPosition(this.props.openedCourse.position.left);

    return (
      <div>
        <div
          style={{left: leftArrowPosition}}
          className={styles.arrow}>
        </div>
        <div
          style={{left: leftArrowPosition - 2}}
          className={styles.arrowBorder}>
        </div>
      </div>
    );
  }
  renderBottomArrow() {
    const leftArrowPosition = this.getLeftArrowPosition(this.props.openedCourse.position.left);

    return (
      <div>
        <div
          style={{left: leftArrowPosition}}
          className={styles.arrowBottom}>
        </div>
        <div
          style={{left: leftArrowPosition - 2}}
          className={styles.arrowBottomBorder}>
        </div>
      </div>
    );
  }
  getDuration(course) {
    const milliseconds = course.scenes.map((scene) => {
      if (scene.recording) {
        return scene.recording.duration * 2;
      }

      return 0;
    }).reduce((total, sceneDuration) => {
      return total + sceneDuration;
    });

    const minutes = Math.ceil(milliseconds / 60000);

    return minutes + ' min';
  }
  render() {
    if (!this.props.openedCourse) {
      return null;
    }
    const topPosition = this.props.openedCourse.position.top;
    const techTreeCourseHeight = this.props.openedCourse.course.type === 'course' ? 75 : 60;
    const displayBoxBelowCourse = topPosition + containerHeight >= window.innerHeight ? false : true;

    return (
      <div
        ref="wrapper"
        style={{
          left: this.getLeftPosition(this.props.openedCourse.position.left),
          top: displayBoxBelowCourse ? topPosition : topPosition - containerHeight - techTreeCourseHeight
        }}
        className={styles.wrapper}>
        {displayBoxBelowCourse ? this.renderTopArrow() : this.renderBottomArrow()}

        {this.renderIcon()}
        <div className={styles.textWrapper}>
          <div className={styles.title}>{this.props.openedCourse.course.name}</div>
          <div className={styles.description}>{this.props.openedCourse.course.description}</div>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressed} style={{width: this.getProgressPercent() + '%'}}></div>
        </div>
        <div className={styles.detailsWrapper}>
          <div className={styles.detail}>
            <div className={styles.value}>{this.getProgressPercent()}%</div>
            <div className={styles.label}>Fullført</div>
          </div>
          <div className={styles.detail}>
            <div className={styles.value}>{this.getDuration(this.props.openedCourse.course)}</div>
            <div className={styles.label}>Estimert kurstid</div>
          </div>
          <div className={styles.detail}>
            <div className={styles.value}>{this.props.openedCourse.course.skillLevel}</div>
            <div className={styles.label}>Ferdighetsnivå</div>
          </div>
          {this.renderButton()}
        </div>
      </div>
    );
  }
}

export default TechTreeCoursePopup;
