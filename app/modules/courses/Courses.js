import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import Toolbar from './components/Toolbar.js';
import styles from './Courses.css';

@Cerebral({
  isLoading: ['courses', 'isLoading']
})
class Courses extends React.Component {
  render() {
    return (
      <div className={styles.wrapper} onClick={() => this.props.signals.courses.appClicked()}>
        <Toolbar/>
        <h1>Courses</h1>
      </div>
    );
  }
}

export default Courses;
