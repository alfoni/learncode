import React from 'react';
import mixin from 'cerebral/mixin';
import CodeToolbar from './CodeToolbar.js';
import DurationSlider from './DurationSlider.js';
import Code from './Code.js';
import {
  Styles,
  Slider
}
from 'material-ui';

var ThemeManager = new Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);

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
      <div>
        <CodeToolbar/>
        <DurationSlider/>
        <Code/>
      </div>
    );
  }
});

export default App;
