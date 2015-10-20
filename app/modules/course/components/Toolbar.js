import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import styles from './Toolbar.css';
import ToolbarButton from 'common/components/Toolbar/ToolbarButton.js';
import ToolbarSeparator from './Toolbar/ToolbarSeparator.js';
import ToolbarTitle from 'common/components/Toolbar/ToolbarTitle.js';
import ToolbarInput from './Toolbar/ToolbarInput.js';
import ToolbarButtonPopover from 'common/components/Toolbar/ToolbarButtonPopover.js';
import ToolbarFileListItem from './Toolbar/ToolbarFileListItem.js';
import AssignmentDescription from './Toolbar/AssignmentDescription.js';
import AssignmentResult from './Toolbar/AssignmentResult.js';
import ConfigureScenes from './Toolbar/ConfigureScenes.js';
import icons from 'common/icons.css';

@Cerebral({
  scenes: ['course', 'scenes'],
  showPreview: ['course', 'showPreview'],
  showConsole: ['course', 'showConsole'],
  showScenesList: ['course', 'showScenesList'],
  showFolder: ['course', 'showFolder'],
  showAddFileInput: ['course', 'showAddFileInput'],
  showConfigureScenes: ['course', 'showConfigureScenes'],
  showEditAssignment: ['course', 'showEditAssignment'],
  showAssignment: ['course', 'showAssignment'],
  courseName: ['course', 'name']
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
          active={file === this.props.currentFile}
        />
      );
    });
  }
  listSceneNameClicked(index) {
    this.props.signals.course.listSceneNameClicked({
      sceneIndex: index
    });
  }
  renderScenesList() {
    const scenes = this.props.scenes;

    return scenes.map((scene, index) => {
      return (
        <ToolbarFileListItem
          key={index}
          onClick={() => this.listSceneNameClicked(index)}
          name={scene.name}
          active={scene === this.props.currentScene}
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
  sceneNameClicked(e) {
    e.stopPropagation();
    this.props.signals.course.sceneNameClicked();
  }
  render() {
    return (
      <div className={styles.background}>
        <ToolbarButton icon={icons.menu}/>
        <ToolbarSeparator/>
        <ToolbarTitle title={this.props.courseName}/>
        <ToolbarButton icon={icons.save} onClick={() => this.props.signals.course.saveSceneClicked()}/>
        <ToolbarSeparator/>
        <ToolbarButtonPopover onClick={(e) => this.folderClick(e)} show={this.props.showFolder} icon={icons.folder}>
          {this.renderFilesList()}
        </ToolbarButtonPopover>
        <ToolbarButton icon={icons.addFile} onClick={() => this.props.signals.course.addFileClicked()}/>
        <ToolbarInput show={this.props.showAddFileInput}
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
        <ToolbarButtonPopover onClick={(e) => this.sceneNameClicked(e)}
                              title={this.props.currentScene.name}
                              show={this.props.showScenesList}>
          {this.renderScenesList()}
        </ToolbarButtonPopover>
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
