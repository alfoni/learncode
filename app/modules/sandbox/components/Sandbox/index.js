import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';

let Scene = null;
let styles = null;
let MouseCursor = null;
let TechTree = null;

@Cerebral({
  isLoading: ['course', 'isLoading'],
  user: ['user']
})
class Course extends React.Component {
  constructor() {
    super();
    this.onKeydown = this.onKeydown.bind(this);
    this.hasMounted = false;
    this.state = {
      canRender: false
    };
  }
  componentDidMount() {
    this.hasMounted = true;
    window.addEventListener('keydown', this.onKeydown);
    require.ensure([], (require) => {
      Scene = require('../Scene');
      MouseCursor = require('modules/course/components/MouseCursor');
      styles = require('modules/course/components/Course/styles.css');
      TechTree = require('modules/course/components/TechTree');

      if (this.hasMounted) {
        this.setState({
          canRender: true
        });
      }
    });
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeydown);
    this.hasMounted = false;
  }
  onKeydown(event) {
    if ((event.metaKey || event.ctrlKey) && event.keyCode === 83) {
      event.preventDefault();

      if (this.props.user.forceUser || !this.props.user.isAdmin) {
        this.props.signals.course.runAssignmentClicked();
      } else {
        this.props.signals.course.saveShortcutPressed();
      }
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
        <TechTree/>
        <Scene/>
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
