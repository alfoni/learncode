import React from 'react';
import mixin from 'cerebral/mixin';
import CodeToolbar from './CodeToolbar.js';
import Sandbox from './Sandbox.js';
import PlayButton from './PlayButton.js';
import RecordButton from './RecordButton.js';
import DurationSlider from './DurationSlider.js';
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
        <DurationSlider/>
        <Code/>
        <Sandbox/>
        <RecordButton/>
        <PlayButton/>
      </div>
    );
  }
});

export default App;
