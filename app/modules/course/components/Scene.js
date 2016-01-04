import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import Module from './Scene/Module.js';
import ModuleToolbar from './Scene/ModuleToolbar.js';
import ModuleFiles from './Scene/ModuleFiles.js';
import CodeEditor from './Scene/CodeEditor.js';
import Preview from './Scene/Preview.js';
import SceneControls from './Scene/SceneControls';
import AddFile from './Scene/AddFile';
import AssignmentsBar from './Scene/AssignmentsBar.js';
import RemoveFile from './Scene/RemoveFile.js';
import Assignment from './Scene/Assignment.js';
import EditAssignment from './Scene/EditAssignment.js';
import styles from './Scene.css';
import currentFile from '../computed/currentFile';
import currentScene from '../computed/currentScene';
import isAdminMode from '../computed/isAdminMode';
import completedAssignments from '../computed/completedAssignments';

@Cerebral({
  isLoading: ['course', 'isLoading'],
  recorder: ['recorder'],
  newFileName: ['course', 'newFileName'],
  showAddFileInput: ['course', 'showAddFileInput'],
  currentAssignmentIndex: ['course', 'currentAssignmentIndex'],
  currentAssignmentStatus: ['course', 'currentAssignmentStatus'],
  completedAssignments: completedAssignments,
  currentFile: currentFile,
  currentScene: currentScene,
  isAdminMode: isAdminMode
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
        <Module className={styles.controlsAndAssignments} show>
          <ModuleToolbar title="LÆRER"/>
          <SceneControls/>
          <ModuleToolbar title="OPPGAVER"/>
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
                onAssignmentRunClick={this.props.signals.course.runAssignmentClicked}
              />
          }
        </Module>
        <Module className={styles.code} show>
          <ModuleToolbar title="KODE">
            <ModuleFiles
              scene={this.props.currentScene}
              currentFile={this.props.currentFile}
              onFileClick={this.props.signals.course.fileClicked}/>
            <AddFile
              onAddFileClick={this.props.signals.course.addFileClicked}
              onFileNameChange={this.props.signals.course.addFileNameUpdated}
              onFileSubmit={this.props.signals.course.addFileSubmitted}
              onAddFileAborted={this.props.signals.course.addFileAborted}
              showInput={this.props.showAddFileInput}
              placeholder="Skriv filnavn..."
              value={this.props.newFileName}/>
          </ModuleToolbar>
          <RemoveFile show={this.props.currentScene.currentFileIndex !== 0} onClick={() => this.props.signals.course.removeFileClicked()}/>
          <CodeEditor/>
          <Preview show={this.props.showPreview}/>
        </Module>
      </div>
    );
  }
}

export default Scene;
