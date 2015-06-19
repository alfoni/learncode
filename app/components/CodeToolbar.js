import React from 'react';
import mixin from 'cerebral/mixin';
import Folder from './CodeToolbar/Folder.js';
import AddFile from './CodeToolbar/AddFile.js';
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
    event.stopPropagation();
    this.signals.folderClicked();
  },
  onAddFileClick(event) {
    event.stopPropagation();
    this.signals.addFileClicked();
  },
  render() {
    
    return (
      <Toolbar style={{padding: '0', zIndex: '99999'}}>
        <ToolbarGroup key={0} float="left">
          <FontIcon className="icon-menu"/>
          <ToolbarSeparator/>
          <ToolbarTitle text="Promises (4:13)" style={{paddingLeft: '24px'}}/>
          <FontIcon className="icon-save"  onClick={this.signals.saveClicked} disabled={this.state.recorder.isPlaying}/>
          <FontIcon className="icon-folder" onClick={this.onFolderClick} disabled={this.state.recorder.isPlaying}/>
          <FontIcon className="icon-file-add" onClick={this.onAddFileClick} disabled={this.state.recorder.isPlaying}/>
          {this.state.showAddFileInput ? <AddFile/> : <span/>}
          <Folder/>
        </ToolbarGroup>
      </Toolbar>
    );
  }
});

export default CodeToolbar;
