import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import Toolbar from './components/Toolbar.js';
import DurationSlider from './components/DurationSlider.js';
import PlayButton from './components/PlayButton.js';
import RecordButton from './components/RecordButton.js';
import VideoFrame from './components/VideoFrame.js';
import Scene from './components/Scene.js';
import styles from './Course.css';

@Cerebral({
  isLoading: ['course', 'isLoading'],
  recorder: ['course', 'recorder']
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
        <PlayButton
          recorder={this.props.recorder}
          onPlayClick={this.props.signals.course.playClicked}
          onStopClick={this.props.signals.course.stopClicked}/>
        <RecordButton
          recorder={this.props.recorder}
          onRecordClick={this.props.signals.course.recordClicked}
          onStopClick={this.props.signals.course.stopClicked}/>
        <VideoFrame/>
      </div>
    );
  }
  render() {
    return this.props.isLoading ? null : this.renderScene();
  }
}

export default Course;
