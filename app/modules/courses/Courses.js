import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import Toolbar from './components/Toolbar.js';
import Courses from './components/Courses.js';
import styles from './Courses.css';

@Cerebral({
  isLoading: ['courses', 'isLoading']
}, {
  currentScene: ['currentScene'],
})
class Course extends React.Component {
  constructor() {
    super();
  }
  renderCourses() {
    return (
      <div className={styles.wrapper} onClick={() => this.props.signals.courses.appClicked()}>
        <Toolbar/>
        <Courses/>
      </div>
    );
  }
  render() {
    return (
      <div>
        <div className={this.props.isLoading ? styles.overlayVisible : styles.overlay}></div>
        {this.props.isLoading ? null : this.renderCourses()}
      </div>
    );
  }
}

export default Course;
