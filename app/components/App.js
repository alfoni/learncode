import React from 'react';
import mixin from 'cerebral/mixin';
import CodeToolbar from './CodeToolbar.js';
import Sandbox from './Sandbox.js';
import SceneControls from './SceneControls.js';
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
    return ['isLoadingCourse', 'snackbar'];
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
  render() {
    return (
      <div style={AppContainerStyle} onClick={this.signals.appClicked}>
        <SceneControls/>
        <CodeToolbar/>
        {this.state.isLoadingCourse ? null : <Code/>}
        {this.state.isLoadingCourse ? null : <Sandbox/>}
        <Snackbar ref="snackbar" message={this.state.snackbar.message}/>
      </div>
    );
  }
});

export default App;
