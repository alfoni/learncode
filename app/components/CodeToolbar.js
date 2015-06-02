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

let CodeToolbar = React.createClass({
  render() {
    return (
      <Toolbar style={{padding: '0', zIndex: '99999'}}>
        <ToolbarGroup key={0} float="left">
          <FontIcon className="icon-menu"/>
          <ToolbarSeparator/>
          <ToolbarTitle text="Promises (4:13)" style={{paddingLeft: '24px'}}/>
          <DropDownMenu menuItems={filterOptions} style={{zIndex: '9999999'}}/>
        </ToolbarGroup>
      </Toolbar>
    );
  }
});

export default CodeToolbar;
