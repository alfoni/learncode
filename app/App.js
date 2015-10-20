import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import Course from './modules/course/Course.js';
import Home from './modules/home/Home.js';
import Courses from './modules/courses/Courses.js';
import styles from './App.css';

const pages = {
  'home': Home,
  'course': Course,
  'courses': Courses
};

@Cerebral({
  page: ['currentPage'],
  snackbar: ['snackbar']
})
class App extends React.Component {
  renderPage() {
    const Page = pages[this.props.page];

    return <Page/>;
  }
  render() {
    return (
      <div>
        {this.renderPage()}
        <div className={this.props.snackbar.show ? styles.snackbarVisible : styles.snackbar}>
          {this.props.snackbar.text}
        </div>
      </div>
    );
  }
}

export default App;
