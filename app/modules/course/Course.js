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
        <div className={this.props.isLoading ? styles.overlayVisible : styles.overlay}></div>
        <Toolbar/>
        <DurationSlider/>
        <Scene/>
        <SceneControls/>
      </div>
    );
  }
  render() {
    return this.props.isLoading ? null : this.renderScene();
  }
}

export default Course;
