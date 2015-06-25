import React from 'react';
import mixin from 'cerebral/mixin';
import CodeToolbar from './CodeToolbar.js';
import Sandbox from './Sandbox.js';
import SceneControls from './SceneControls.js';
import Console from './Console.js';
import AssignmentEditor from './AssignmentEditor.js';
import ClickIndication from './ClickIndication.js';

import Code from './Code.js';
import {
  Styles,
  Slider,
  Snackbar
}
from 'material-ui';

let ThemeManager = new Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);

let AppContainerStyle = {
  position: 'relative',
  height: '100%',
  overflow: 'hidden'
};

let App = React.createClass({
  mixins: [mixin],
  holdingCmd: false,
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  componentDidMount() {
    this.signals.appMounted();
    window.addEventListener('keydown', this.onWindowKeydown);
    window.addEventListener('keyup', this.onWindowKeyup);
  },
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onWindowKeydown);
    window.removeEventListener('keyup', this.onWindowKeyup);
  },
  getCerebralState() {
    return {
      isLoadingCourse: ['isLoadingCourse'],
      snackbar: ['snackbar'],
      showBrowser: ['course', 'showBrowser'],
      assignment: ['course', 'assignment']
    };
  },
  onWindowKeydown(event) {
    if (event.keyCode === 91) {
      this.holdingCmd = true;
    }
    if (event.keyCode === 83 && this.holdingCmd) {
      event.preventDefault();
      this.signals.savePressed();
    }
  },
  onWindowKeyup(event) {
    if (event.keyCode === 91) {
      this.holdingCmd = false;
    }
  },
  componentDidUpdate(prevProps, prevState) {
    if (this.state.snackbar.show && !prevState.snackbar.show) {
      this.refs.snackbar.show();
    }
    if (!this.state.snackbar.show && prevState.snackbar.show) {
      this.refs.snackbar.dismiss();
    }
  },
  onAppClicked(event) {
    this.signals.appClicked({
      x: event.clientX,
      y: event.clientY
    });
  },
  render() {
    let width = this.state.assignment.showEditor ? '33.33333%' : '50%';
    return (
      <div style={AppContainerStyle} onClick={this.onAppClicked}>
        <CodeToolbar/>
        <SceneControls/>
        {this.state.isLoadingCourse || !this.state.assignment.showEditor ? null : <AssignmentEditor width={width}/>}
        {this.state.isLoadingCourse ? null : <Code width={width}/>}
        {this.state.isLoadingCourse ? null : <Sandbox width={width}/>}
        {this.state.isLoadingCourse || this.state.showBrowser ? null : <Console width={width}/>}
        <Snackbar ref="snackbar" message={this.state.snackbar.message}/>
        <ClickIndication/>
      </div>
    );
  }
});

export default App;
