import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import Course from './modules/course/components/Course';
import Home from './modules/home/components/Home';
import Courses from './modules/courses/components/Courses';
import Sessions from './modules/sessions/components/Sessions';
import TechTree from './modules/techTree/TechTree.js';
import styles from './App.css';

const pages = {
  'home': Home,
  'course': Course,
  'courses': Courses,
  'sessions': Sessions,
  'techTree': TechTree
};

@Cerebral({
  page: ['currentPage'],
  snackbar: ['snackbar'],
  user: ['user']
})
class App extends React.Component {
  constructor() {
    super();
    this.snackbarTimeout = null;
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.snackbar.show && this.props.snackbar.show) {
      this.setSnackbarTimeout();
    }

    if (this.props.snackbar.persist && !prevProps.snackbar.persist) {
      clearTimeout(this.snackbarTimeout);
    } else if (!this.props.snackbar.persist && prevProps.snackbar.persist) {
      this.setSnackbarTimeout();
    }

    if (this.props.snackbar.show && prevProps.snackbar.text !== this.props.snackbar.text) {
      clearTimeout(this.snackbarTimeout);

      if (!this.props.snackbar.persist) {
        this.setSnackbarTimeout();
      }
    }
  }
  setSnackbarTimeout() {
    this.snackbarTimeout = setTimeout(() => this.props.signals.snackbarTimedOut({}, {isRecorded: true}), 2000);
  }
  renderPage() {
    const Page = pages[this.props.page];

    if (this.props.user.isLoading) {
      return <div className={styles.label}/>;
    }

    return <Page/>;
  }
  render() {
    return (
      <div className={styles.wrapper}>
        {this.renderPage()}
        <div className={this.props.snackbar.show ? styles.snackbarVisible : styles.snackbar}>
          {this.props.snackbar.text}
        </div>
      </div>
    );
  }
}

export default App;
