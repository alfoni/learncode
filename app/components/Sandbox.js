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
      <iframe src="about:blank" ref="sandbox"/>
    );
  }
});

export default Sandbox;
