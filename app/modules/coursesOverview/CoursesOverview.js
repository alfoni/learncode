import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import Toolbar from './components/Toolbar.js';
import styles from './coursesOverview.css';

@Cerebral({
  isLoading: ['coursesOverview', 'isLoading']
}, {
  currentScene: ['currentScene'],
})
class Course extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className={styles.wrapper} onClick={() => this.props.signals.coursesOverview.appClicked()}>
        <Toolbar/>
        <h1>Courses overview</h1>
      </div>
    );
  }
}

export default Course;
