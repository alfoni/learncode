import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';

let Toolbar = null;
let DurationSlider = null;
let SceneControls = null;
let Scene = null;
let styles = null;

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
    return !this.state.canRender || this.props.isLoading ? null : this.renderScene();
  }
}

export default Course;
