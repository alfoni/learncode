import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import styles from './Toolbar.css';
import ToolbarButton from './Toolbar/ToolbarButton.js';
import ToolbarSeparator from './Toolbar/ToolbarSeparator.js';
import ToolbarTitle from './Toolbar/ToolbarTitle.js';
import ToolbarInput from './Toolbar/ToolbarInput.js';
import ToolbarButtonPopover from './Toolbar/ToolbarButtonPopover.js';
import icons from 'common/icons.css';

@Cerebral({
  showAddFileInput: ['course', 'showAddFileInput'],
  showFolder: ['course', 'showFolder']
})
class Toolbar extends React.Component {
  folderClick(e) {
    e.stopPropagation();
    this.props.signals.course.openFolderClicked();
  }
  render() {
    return (
      <div className={styles.background}>
        <ToolbarButton icon={icons.menu}/>
        <ToolbarSeparator/>
        <ToolbarTitle title="Heisann!"/>
        <ToolbarButton icon={icons.save}/>
        <ToolbarSeparator/>
        <ToolbarButtonPopover onClick={(e) => this.folderClick(e)} show={this.props.showFolder} icon={icons.folder}>
          <div style={{width: '100%', height: 40}}></div>
        </ToolbarButtonPopover>
        <ToolbarButton icon={icons.addFile} onClick={() => this.props.signals.course.addFileClicked()}/>
        {
          this.props.showAddFileInput ?
            <ToolbarInput onBlur={() => this.props.signals.course.addFileInputBlurred()} placeholder="Type filename..."/>
          :
            null
        }
        <ToolbarSeparator/>
        <ToolbarButton icon={icons.showBrowser}/>
        <ToolbarButton icon={icons.assignment}/>
        <ToolbarSeparator/>
        <ToolbarButton icon={icons.school}/>
        <ToolbarButton icon={icons.checkbox}/>
        <ToolbarButton icon={icons.editAssignment}/>
      </div>
    );
  }
}

export default Toolbar;
