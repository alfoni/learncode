import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import Input from 'common/components/Input.js';
import icons from 'common/icons.css';
import styles from './AddNewCourse.css';

@Cerebral({
  showSavingCourse: ['coursesOverview', 'showSavingCourse']
})
class AddNewCourse extends React.Component {
  addNewCourseKeyDown(e) {
    const keyCode = e.keyCode;
    const newCourseName = e.target.value;
    this.props.signals.coursesOverview.newCourseNameUpdated({
      newCourseName: newCourseName
    });

    if (keyCode === 13) { // Enter
      this.createCourseSubmitted();
    }
  }
  createCourseSubmitted() {
    this.props.signals.coursesOverview.addCourseSubmitted();
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Opprett nytt kurs</h2>
        <Input
          onKeyDown={(e) => this.addNewCourseKeyDown(e)}
          placeholder="Navn på kurs"
          disabled={this.props.showSavingCourse}/>
        <button
          className={styles.button}
          onClick={() => this.createCourseSubmitted()}
          disabled={this.props.showSavingCourse}>
          {
            this.props.showSavingCourse ?
              <span className={styles.savingIcon + ' ' + icons.loading}></span>
            :
              'Opprett kurs'
          }
        </button>
      </div>
    );
  }
}

export default AddNewCourse;
