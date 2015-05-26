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
  ToolbarTitle,
  RaisedButton
}
from 'material-ui';

let filterOptions = [{
  payload: '1',
  text: 'index.html'
}, {
  payload: '2',
  text: 'All Voice'
}, {
  payload: '3',
  text: 'All Text'
}, {
  payload: '4',
  text: 'Complete Voice'
}, {
  payload: '5',
  text: 'Complete Text'
}, {
  payload: '6',
  text: 'Active Voice'
}, {
  payload: '7',
  text: 'Active Text'
}, ];

let menuItems = [{
  route: 'get-started',
  text: 'Get Started'
}, {
  route: 'customization',
  text: 'Customization'
}, {
  route: 'components',
  text: 'Components'
}, {
  type: MenuItem.Types.SUBHEADER,
  text: 'Resources'
}, {
  type: MenuItem.Types.LINK,
  payload: 'https://github.com/callemall/material-ui',
  text: 'GitHub'
}, {
  text: 'Disabled',
  disabled: true
}, {
  type: MenuItem.Types.LINK,
  payload: 'https://www.google.com',
  text: 'Disabled Link',
  disabled: true
}, ];

let CodeToolbar = React.createClass({
  render() {
    return (
      <Toolbar style={{padding: '0', zIndex: '99999'}}>
        <ToolbarGroup key={0} float="left">
          <FontIcon className="icon-menu"/>
          <ToolbarSeparator/>
          <ToolbarTitle text="Promises (4:13)" style={{paddingLeft: '24px'}}/>
          <RaisedButton label="Play scene" primary={true} />
          <DropDownMenu menuItems={filterOptions} style={{zIndex: '9999999'}}/>
        </ToolbarGroup>
      </Toolbar>
    );
  }
});

export default CodeToolbar;
