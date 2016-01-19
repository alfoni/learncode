import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import Module from '../Module';
import DurationSlider from '../DurationSlider';
import ToolbarTitle from 'common/components/Toolbar/ToolbarTitle.js';
import Toolbar from '../Toolbar';
import CodeEditor from '../CodeEditor';
import Preview from '../Preview';
import SceneControls from '../SceneControls';

import AssignmentsBar from '../AssignmentsBar';
import EditAssignment from '../EditAssignment';
import styles from './styles.css';
import currentFile from '../../computed/currentFile';
import currentScene from '../../computed/currentScene';
import isAdminMode from '../../computed/isAdminMode';
import Assignment from '../Assignment';
import CourseHeader from '../CourseHeader';

@Cerebral({
  isLoading: ['course', 'isLoading'],
  recorder: ['recorder'],
  courseName: ['course', 'name'],
  currentAssignmentIndex: ['course', 'currentAssignmentIndex'],
  currentAssignmentStatus: ['course', 'currentAssignmentStatus'],
  completedAssignments: ['user', 'assignmentsSolved'],
  currentFile: currentFile,
  currentScene: currentScene,
  isAdminMode: isAdminMode,
  showScenesList: ['course', 'showScenesList'],
  scenesList: ['course', 'scenesList']
})
class Scene extends React.Component {
  assignmentDescriptionChanged(e) {
    this.props.signals.course.assignmentDescriptionChanged.sync({
      description: e.target.value
    });
  }
  render() {
    return (
      <div className={styles.modules}>
        <Module className={this.props.isAdminMode ? styles.controlsAndAssignmentsAdmin : styles.controlsAndAssignments} show>
          <Toolbar>
            <ToolbarTitle title="Kursoversikt"/>
          </Toolbar>
          <CourseHeader
            title={this.props.courseName}
            sceneNameClicked={this.props.signals.course.sceneNameClicked}
            showScenesList={this.props.showScenesList}
            scenes={this.props.scenesList}
            currentScene={this.props.currentScene}
            onSceneItemClick={this.props.signals.course.listSceneNameClicked}/>
          <SceneControls/>
          <DurationSlider/>
          <AssignmentsBar
            assignments={this.props.currentScene.assignments}
            currentAssignmentIndex={this.props.currentAssignmentIndex}
            isAdminMode={this.props.isAdminMode && !this.props.recorder.isRecording}
            onAssignmentClick={this.props.signals.course.assignmentClicked}
            onNewAssignmentClick={this.props.signals.course.newAssignmentClicked}
            completedAssignments={this.props.completedAssignments}
          />
          {
            this.props.isAdminMode && !this.props.recorder.isRecording ?
              <EditAssignment
                currentScene={this.props.currentScene}
                currentAssignmentIndex={this.props.currentAssignmentIndex}
                assignment={this.props.currentScene.assignments[this.props.currentAssignmentIndex]}
                onDescriptionChange={this.props.signals.course.assignmentDescriptionChanged}
                onCodeChange={this.props.signals.course.assignmentCodeChanged}
                currentAssignmentStatus={this.props.currentAssignmentStatus}
                onAssignmentRunClick={this.props.signals.course.runAssignmentClicked}
              />
            :
              <Assignment
                assignment={this.props.currentScene.assignments[this.props.currentAssignmentIndex]}
                currentAssignmentStatus={this.props.currentAssignmentStatus}
                completed={this.props.completedAssignments.indexOf(this.props.currentAssignmentIndex) >= 0}
              />
          }
        </Module>
        <Module className={styles.code} show>
          <CodeEditor/>
          <Preview show={this.props.showPreview}/>
        </Module>
      </div>
    );
  }
}

export default Scene;
