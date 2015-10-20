import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import Toolbar from './components/Toolbar.js';
import DurationSlider from './components/DurationSlider.js';
import SceneControls from './components/SceneControls.js';
import Scene from './components/Scene.js';
import styles from './Course.css';

@Cerebral({
  isLoading: ['course', 'isLoading']
}, {
  currentScene: ['currentScene'],
})
class Course extends React.Component {
  constructor() {
    super();
    this.onKeydown = this.onKeydown.bind(this);
  }
  componentDidMount() {
    window.addEventListener('keydown', this.onKeydown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeydown);
  }
  onKeydown(event) {
    if (event.metaKey && event.keyCode === 83) {
      event.preventDefault();
      this.props.signals.course.saveShortcutPressed();
    }
  }
  assignmentDescriptionChanged(e) {
    this.props.signals.course.assignmentDescriptionChanged.sync({
      description: e.target.value
    });
  }
  renderScene() {
    return (
      <div className={styles.wrapper} onClick={() => this.props.signals.course.appClicked()}>
        <Toolbar/>
        <DurationSlider/>
        <Scene/>
        <SceneControls/>
      </div>
    );
  }
  render() {
    return (
      <div>
        <div className={this.props.isLoading ? styles.overlayVisible : styles.overlay}></div>
        {this.props.isLoading ? null : this.renderScene()}
      </div>
    );
  }
}

export default Course;
