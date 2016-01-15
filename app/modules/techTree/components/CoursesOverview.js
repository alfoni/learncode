import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './CoursesOverview.css';

@Cerebral({
  selectedCourse: ['techTree', 'selectedCourse'],
  courses: ['techTree', 'courses'],
  courseDependencyList: ['techTree', 'courseDependencyList']
})
class CoursesOverview extends React.Component {
  renderCourses(courses) {
    if (!courses) {
      return <div>Ingen kurs er opprettet</div>;
    }

    return courses.filter((course) => {
      if (!this.props.courseDependencyList.length) {
        return true;
      }

      return !this.props.courseDependencyList.find((dependencyCourse) => {
        return course.id === dependencyCourse.course.id;
      });
    }).map((course, index) => {
      return (
        <div
          key={index}
          className={styles.course}
          onClick={() => this.props.signals.techTree.onCourseDependencyClicked({course: course})}>
          {course.title}
        </div>
      );
    });
  }
  render() {
    return (
      <div className={styles.wrapper}>
        {this.props.selectedCourse ? 'Velg kurs som er avhengig av: ' + this.props.selectedCourse.title : 'Velg kurs:'}
        <br/><br/>
        {this.renderCourses(this.props.courses)}
      </div>
    );
  }
}

export default CoursesOverview;
