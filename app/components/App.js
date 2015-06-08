import React from 'react';
import mixin from 'cerebral/mixin';
import CodeToolbar from './CodeToolbar.js';
import Sandbox from './Sandbox.js';
import SceneControls from './SceneControls.js';
import Code from './Code.js';
import {
  Styles,
  Slider
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
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  render() {
    return (
      <div style={AppContainerStyle}>
        <CodeToolbar/>
        <SceneControls/>
        <Code/>
        <Sandbox/>
      </div>
    );
  }
});

export default App;
