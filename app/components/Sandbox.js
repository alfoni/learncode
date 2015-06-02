import React from 'react';
import Cerebral from 'cerebral/decorator';
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
  render() {
    return (
      <iframe ref="sandbox"/>
    );
  }
});

export default Sandbox;
