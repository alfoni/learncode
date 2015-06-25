import React from 'react';
import mixin from 'cerebral/mixin';
import stopPropagation from './../../utils/stopPropagation.js';
import {
  Menu
} from 'material-ui';

let FolderStyle = {
  position: 'absolute',
  zIndex: 10,
  top: 45,
  left: 305
};

let Folder = React.createClass({
  mixins: [mixin],
  getCerebralState() {
    return ['course'];
  },
  createMenuItems() {
    return this.state.course.files.map(function(file, index) {
      return {
        payload: index,
        text: file.name,
        iconClassName: 'icon-file'
      };
    });
  },
  onItemSelected(event, index) {
    this.signals.fileSelected(index);
  },
  render() {
    return (
      <span onClick={stopPropagation}>
        {
          this.state.course.showFolder ? 
            <div className="arrow_box" style={FolderStyle}>
              <Menu 
                menuItems={this.createMenuItems()}
                selectedIndex={this.state.course.currentFileIndex} 
                autoWidth={true}

                onItemTap={this.onItemSelected}/>
            </div>
            :
            null
        }
      </span>
    );
  }
});

export default Folder;