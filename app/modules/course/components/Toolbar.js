import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import styles from './Toolbar.css';
import ToolbarButton from 'common/components/Toolbar/ToolbarButton.js';
import ToolbarSeparator from './Toolbar/ToolbarSeparator.js';
import ToolbarTitle from 'common/components/Toolbar/ToolbarTitle.js';
import ToolbarButtonPopover from 'common/components/Toolbar/ToolbarButtonPopover.js';
import ConfigureScenes from './Toolbar/ConfigureScenes.js';
import icons from 'common/icons.css';
import currentScene from '../computed/currentScene';
import currentFile from '../computed/currentFile';
import isAdminMode from '../computed/isAdminMode';

@Cerebral({
  courseId: ['course', 'courseId'],
  scenes: ['course', 'scenesList'],
  showConfigureScenes: ['course', 'showConfigureScenes'],
  showEditAssignment: ['course', 'showEditAssignment'],
  courseName: ['course', 'name'],
  isLoadingPreview: ['course', 'isLoadingPreview'],
  recorder: ['recorder'],
  currentFile: currentFile,
  currentScene: currentScene,
  user: ['user'],
  isAdminMode: isAdminMode,
  completedAssignments: ['user', 'assignmentsSolved']
})
class Toolbar extends React.Component {
  renderScenesList() {
    const scenes = this.props.scenes;

    return scenes.map((scene, index) => {
      return (
        <ToolbarButton
          icon={icons.scene}
          key={index}
          onClick={() => this.props.signals.course.listSceneNameClicked({sceneIndex: index})}
          title={`${this.props.completedAssignments.length} / ${scene.assignmentsCount}`}
          active={index === this.props.currentScene.index}
          iconText={`${index + 1}.`}
          />
      );
    });
  }
  configureScenesClicked() {
    this.props.signals.course.configureScenesClicked();
  }
  sceneNameClicked() {
    this.props.signals.course.sceneNameClicked();
  }
  render() {
    return (
      <div className={this.props.isAdminMode ? styles.adminWrapper : styles.wrapper}>
        { this.props.recorder.isPlaying ? <div className={styles.toolbarOverlay}></div> : null }
        <ToolbarSeparator/>
        <ToolbarTitle title={this.props.courseName}/>
        <ToolbarSeparator/>
        {this.renderScenesList()}
        {
          this.props.isAdminMode ?
            <ToolbarButtonPopover icon={icons.addCourse}
                                  onClick={(e) => this.configureScenesClicked(e)}
                                  show={this.props.showConfigureScenes}>
              <ConfigureScenes/>
            </ToolbarButtonPopover>
          :
            null
        }
        {
          this.props.user.isAdmin ?
            <span>
              <ToolbarSeparator/>
              <ToolbarButton
                active={!this.props.isAdminMode}
                icon={icons.user}
                onClick={this.props.signals.course.toggleForceUserClicked}/>
            </span>
          :
            null
        }
      </div>
    );
  }
}

export default Toolbar;
