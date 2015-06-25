import React from 'react';
import mixin from 'cerebral/mixin';
import {
  FontIcon
} from 'material-ui';

let DeleteFileStyle = {
  float: 'right',
  borderRadius: '3px',
  marginLeft: '5px'
};

let IconStyle = {
  color: 'rgba(0, 0, 0, 0.4)',
  cursor: 'pointer'
};

let DeleteFile = React.createClass({
  mixins: [mixin],
  getCerebralState() {
    return {
      fileName: ['course', 'currentFileName']
    }
  },
  render() {
    
    if (this.state.fileName === 'index.html') {
      return null;
    }

    return (
      <div style={DeleteFileStyle}>
        <FontIcon 
          style={IconStyle} 
          hoverColor="rgba(0, 0, 0, 0.8)" 
          className="icon-delete" 
          onClick={this.signals.deleteFileClicked}/>
      </div>
    );
  }
});

export default DeleteFile;