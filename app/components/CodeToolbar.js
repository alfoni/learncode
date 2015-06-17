import React from 'react';
import mixin from 'cerebral/mixin';
import {
  Toolbar,
  ToolbarGroup,
  RaisedButton,
  FontIcon,
  LeftNav,
  MenuItem,
  ToolbarSeparator,
  ToolbarTitle
}
from 'material-ui';

let CodeToolbar = React.createClass({
  mixins: [mixin],
  getCerebralState() {
    return ['recorder'];
  },
  render() {
    return (
      <Toolbar style={{padding: '0', zIndex: '99999'}}>
        <ToolbarGroup key={0} float="left">
          <FontIcon className="icon-menu"/>
          <ToolbarSeparator/>
          <ToolbarTitle text="Promises (4:13)" style={{paddingLeft: '24px'}}/>
          <RaisedButton label="Save" primary={true} onClick={this.signals.saveClicked} disabled={this.state.recorder.isPlaying}/>
        </ToolbarGroup>
      </Toolbar>
    );
  }
});

export default CodeToolbar;
