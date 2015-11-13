import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';

let Toolbar = null;
let DurationSlider = null;
let SceneControls = null;
let Scene = null;
let styles = null;
let MouseCursor = null;

@Cerebral({
  isLoading: ['course', 'isLoading']
}, {
  currentScene: ['currentScene'],
})
class Course extends React.Component {
  constructor() {
    super();
    this.onKeydown = this.onKeydown.bind(this);
    this.state = {
      canRender: false
    };
  }
  componentDidMount() {
    window.addEventListener('keydown', this.onKeydown);
    require.ensure([], (require) => {
      Toolbar = require('./components/Toolbar.js');
      DurationSlider = require('./components/DurationSlider.js');
      SceneControls = require('./components/SceneControls.js');
      Scene = require('./components/Scene.js');
      MouseCursor = require('./components/MouseCursor.js');
      styles = require('./Course.css');
      this.setState({
        canRender: true
      });
    });
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
  onAppClicked(e) {
    this.props.signals.course.appClicked({
      mousePositionX: e.clientX,
      mousePositionY: e.clientY
    });
  }
  renderScene() {
    return (
      <div className={styles.wrapper} onClick={(e) => this.onAppClicked(e)}>
        <Toolbar/>
        <DurationSlider/>
        <Scene/>
        <SceneControls/>
        <MouseCursor/>
      </div>
    );
  }
  render() {
    if (this.state.canRender) {
      return (
        <div>
          <div className={this.props.isLoading ? styles.overlayVisible : styles.overlay}></div>
          {this.props.isLoading ? null : this.renderScene()}
        </div>
      );
    }

    return null;
  }
}

export default Course;
