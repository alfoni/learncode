import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';
import ToolbarButton from 'common/components/ToolbarButton';
import ToolbarSeparator from '../ToolbarSeparator';
import ToolbarTitle from 'common/components/ToolbarTitle';
import ToolbarButtonPopover from 'common/components/ToolbarButtonPopover';
import ConfigureScenes from '../ConfigureScenes';
import icons from 'common/icons.css';
import currentScene from '../../computed/currentScene';
import currentFile from '../../computed/currentFile';
import isAdminMode from '../../computed/isAdminMode';

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
      </div>
    );
  }
}

export default Toolbar;
