import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import icons from 'common/icons.css';
import styles from './AddNewCourse.css';
import elements from 'common/elements.css';

@Cerebral({
  isSavingNewCourse: ['courses', 'isSavingNewCourse']
})
class AddNewCourse extends React.Component {
  onNewCourseSubmit(e) {
    e.preventDefault();
    this.props.signals.courses.newCourseSubmitted();
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <form onSubmit={(e) => this.onNewCourseSubmit(e)}>
          <input
            className={elements.input}
            onChange={(e) => this.props.signals.courses.newCourseNameUpdated.sync({newCourseName: e.target.value})}
            placeholder="Navn på kurs"
            disabled={this.props.showSavingCourse}
            autoFocus/>
          <button
            type="submit"
            className={styles.button}
            disabled={this.props.isSavingNewCourse}>
            {
              this.props.isSavingNewCourse ?
                <span className={styles.savingIcon + ' ' + icons.loading}></span>
              :
                'Opprett kurs'
            }
          </button>
        </form>
      </div>
    );
  }
}

export default AddNewCourse;
