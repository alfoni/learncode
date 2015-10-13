import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import styles from './Toolbar.css';
import ToolbarButton from './Toolbar/ToolbarButton.js';
import ToolbarSeparator from './Toolbar/ToolbarSeparator.js';
import ToolbarTitle from './Toolbar/ToolbarTitle.js';
import ToolbarInput from './Toolbar/ToolbarInput.js';
import ToolbarButtonPopover from './Toolbar/ToolbarButtonPopover.js';
import ToolbarFileListItem from './Toolbar/ToolbarFileListItem.js';
import AssignmentDescription from './Toolbar/AssignmentDescription.js';
import AssignmentResult from './Toolbar/AssignmentResult.js';
import ConfigureScenes from './Toolbar/ConfigureScenes.js';
import icons from 'common/icons.css';

@Cerebral({
  showPreview: ['course', 'showPreview'],
  showConsole: ['course', 'showConsole'],
  showConfigureScenes: ['course', 'showConfigureScenes'],
  showEditAssignment: ['course', 'showEditAssignment'],
  showAssignment: ['course', 'showAssignment']
}, {
  currentFile: ['currentFile'],
  currentScene: ['currentScene']
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
    const files = this.props.currentScene.sandboxFiles || [];

    return files.map((file, index) => {
      return (
        <ToolbarFileListItem
          icon={icons.description}
          key={index}
          name={file.name}
          onClick={() => this.folderFileClicked(index)}
          currentFile={file === this.props.currentFile}
        />
      );
    });
  }
  addFileInputKeyDown(e) {
    const keyCode = e.keyCode;
    const fileName = e.target.value;

    if (keyCode === 27) { // Escape
      this.props.signals.course.addFileAborted();
    } else if (keyCode === 13) { // Enter
      this.props.signals.course.addFileSubmitted({
        name: fileName
      });
    }
  }
  assignmentClicked(e) {
    e.stopPropagation();
    this.props.signals.course.openAssignmentClicked();
  }
  configureScenesClicked(e) {
    e.stopPropagation();
    this.props.signals.course.configureScenesClicked();
  }
  render() {
    return (
      <div className={styles.background}>
        <ToolbarButton icon={icons.menu}/>
        <ToolbarSeparator/>
        <ToolbarTitle title="Heisann!"/>
        <ToolbarButton icon={icons.save} onClick={() => this.props.signals.course.saveCourseClicked()}/>
        <ToolbarSeparator/>
        <ToolbarButtonPopover onClick={(e) => this.folderClick(e)} show={this.props.currentScene.showFolder} icon={icons.folder}>
          {this.renderFilesList()}
        </ToolbarButtonPopover>
        <ToolbarButton icon={icons.addFile} onClick={() => this.props.signals.course.addFileClicked()}/>
        <ToolbarInput show={this.props.currentScene.showAddFileInput}
                      onKeyDown={(e) => this.addFileInputKeyDown(e)}
                      onBlur={() => this.props.signals.course.addFileInputBlurred()}
                      placeholder="Type filename..."/>
        <ToolbarSeparator/>
        <ToolbarButton active={this.props.showPreview} icon={icons.showBrowser} onClick={() => this.props.signals.course.showPreviewClicked()}/>
        <ToolbarButton active={this.props.showConsole} icon={icons.assignment} onClick={() => this.props.signals.course.showConsoleClicked()}/>
        <ToolbarSeparator/>
        <ToolbarButtonPopover onClick={(e) => this.assignmentClicked(e)} show={this.props.showAssignment} icon={icons.school}>
          <AssignmentDescription description={this.props.currentScene.assignment.description}/>
          <AssignmentResult/>
        </ToolbarButtonPopover>
        <ToolbarButton icon={icons.checkbox}/>
        <ToolbarButton active={this.props.showEditAssignment}
                       onClick={() => this.props.signals.course.editAssignmentClicked()}
                       icon={icons.editAssignment}/>
        <ToolbarSeparator/>
        <ToolbarButtonPopover icon={icons.thumbUp}
                              onClick={(e) => this.configureScenesClicked(e)}
                              show={this.props.showConfigureScenes}>
          <ConfigureScenes/>
        </ToolbarButtonPopover>
      </div>
    );
  }
}

export default Toolbar;
