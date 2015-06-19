import React from 'react';
import mixin from 'cerebral/mixin';
import {
  Toolbar,
  ToolbarGroup,
  DropDownMenu,
  FontIcon,
  LeftNav,
  MenuItem,
  ToolbarSeparator,
  ToolbarTitle
}
from 'material-ui';

let SandboxStyle = {
  width: '50%',
  display: 'inline-block',
  verticalAlign: 'top',
  boxSizing: 'border-box',
  border: 0,
  borderLeft: '2px solid #EEE',
  height: 'calc(100% - 86px)'
};

let Sandbox = React.createClass({
  mixins: [mixin],
  componentWillMount() {
    this.context.cerebral.on('sandbox:saved', this.onSandboxSaved);
  },
  componentWillUnmount() {
    this.context.cerebral.off('sandbox:saved', this.onSandboxSaved);
  },
  onSandboxSaved() {
    this.refs.sandbox.getDOMNode().src = "http://sandbox.learncode.com:3000";
  },
  render() {
    return (
      <iframe style={SandboxStyle} src="about:blank" ref="sandbox"/>
    );
  }
});

export default Sandbox;
