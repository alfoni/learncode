import React from 'react';
import mixin from 'cerebral/mixin';
import Folder from './CodeToolbar/Folder.js';
import AddFile from './CodeToolbar/AddFile.js';
import BrowserButton from './CodeToolbar/BrowserButton.js';
import ConsoleButton from './CodeToolbar/ConsoleButton.js';
import AssignmentToolbar from './CodeToolbar/AssignmentToolbar.js';
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
    return {
      recorder: ['recorder'],
      showAddFileInput: ['course', 'showAddFileInput']
    };
  },
  onFolderClick(event) {
    setTimeout(() => {
      this.signals.folderClicked();
    }, 0);
  },
  onAddFileClick(event) {
    setTimeout(() => {
      this.signals.addFileClicked();
    }, 0);
  },
  render() {
    
    return (
      <Toolbar style={{padding: '0', zIndex: '99999'}}>
        <ToolbarGroup key={0} float="left">
          <FontIcon className="icon-menu"/>
          <ToolbarSeparator/>
          <ToolbarTitle text="Promises (4:13)" style={{paddingLeft: '24px'}}/>
          <FontIcon className="icon-save"  onClick={this.signals.saveClicked} disabled={this.state.recorder.isPlaying}/>
          <ToolbarSeparator/>
          <FontIcon className="icon-folder" onClick={this.onFolderClick} disabled={this.state.recorder.isPlaying}/>
          <FontIcon className="icon-file-add" onClick={this.onAddFileClick} disabled={this.state.recorder.isPlaying}/>
          {this.state.showAddFileInput ? <AddFile/> : <span/>}
          <Folder/>
          <ToolbarSeparator/>
          <BrowserButton/>
          <ConsoleButton/>
          <ToolbarSeparator/>
          <AssignmentToolbar/>
        </ToolbarGroup>
      </Toolbar>
    );
  }
});

export default CodeToolbar;
