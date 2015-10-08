import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import styles from './Toolbar.css';
import ToolbarButton from './Toolbar/ToolbarButton.js';
import ToolbarSeparator from './Toolbar/ToolbarSeparator.js';
import ToolbarTitle from './Toolbar/ToolbarTitle.js';
import ToolbarInput from './Toolbar/ToolbarInput.js';
import ToolbarButtonPopover from './Toolbar/ToolbarButtonPopover.js';
import ToolbarFileListItem from './Toolbar/ToolbarFileListItem.js';
import icons from 'common/icons.css';

@Cerebral({
  showAddFileInput: ['course', 'currentScene', 'showAddFileInput'],
  showFolder: ['course', 'currentScene', 'showFolder'],
  files: ['course', 'currentScene', 'sandboxFiles'],
  showPreview: ['course', 'showPreview'],
  showConsole: ['course', 'showConsole'],
  selectedFile: ['course', 'selectedFile']
})
class Toolbar extends React.Component {
  folderClick(e) {
    e.stopPropagation();
    this.props.signals.course.openFolderClicked();
  }
  folderFileClicked(index) { // TOOD: Refacotr to folderFileClicked
    this.props.signals.course.folderFileClicked({index: index});
  }
  renderFilesList() {
    const files = this.props.files || [];

    return files.map((file, index) => {
      return (
        <ToolbarFileListItem
          icon={icons.description}
          key={index}
          name={file.name}
          onClick={() => this.folderFileClicked(index)}
          selectedFile={file === this.props.selectedFile}
        />
      );
    });
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
          {this.renderFilesList()}
        </ToolbarButtonPopover>
        <ToolbarButton icon={icons.addFile} onClick={() => this.props.signals.course.addFileClicked()}/>
        <ToolbarInput show={this.props.showAddFileInput}
                      onBlur={() => this.props.signals.course.addFileInputBlurred()}
                      placeholder="Type filename..."/>
        <ToolbarSeparator/>
        <ToolbarButton active={this.props.showPreview} icon={icons.showBrowser} onClick={() => this.props.signals.course.showPreviewClicked()}/>
        <ToolbarButton active={this.props.showConsole} icon={icons.assignment} onClick={() => this.props.signals.course.showConsoleClicked()}/>
        <ToolbarSeparator/>
        <ToolbarButton icon={icons.school}/>
        <ToolbarButton icon={icons.checkbox}/>
        <ToolbarButton icon={icons.editAssignment}/>
      </div>
    );
  }
}

export default Toolbar;
