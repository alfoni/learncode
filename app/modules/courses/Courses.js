import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';

let Toolbar = null;
let styles = null;
let CoursesList = null;

@Cerebral({
  isLoading: ['courses', 'isLoading']
})
class Courses extends React.Component {
  constructor() {
    super();
    this.state = {
      canRender: false
    };
  }
  componentDidMount() {
    require.ensure([], (require) => {
      Toolbar = require('./components/Toolbar.js');
      CoursesList = require('./components/CoursesList.js');
      styles = require('./Courses.css');
      this.setState({
        canRender: true
      });
    });
  }
  renderCourses() {
    return (
      <div className={styles.wrapper} onClick={() => this.props.signals.courses.appClicked()}>
        <Toolbar/>
        <div className={styles.contentWrapper}>
          <CoursesList/>
        </div>
      </div>
    );
  }
  render() {
    if (this.state.canRender) {
      return (
        <div>
          <div className={this.props.isLoading ? styles.overlayVisible : styles.overlay}></div>
          {this.props.isLoading ? null : this.renderCourses()}
        </div>
      );
    }

    return null;
  }
}

export default Courses;
