import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import Module from '../Module';
import DurationSlider from '../DurationSlider';
import ModuleToolbar from '../ModuleToolbar';
import ModuleFiles from '../ModuleFiles';
import CodeEditor from '../CodeEditor';
import Preview from '../Preview';
import SceneControls from '../SceneControls';
import AddFile from '../AddFile';
import AssignmentsBar from '../AssignmentsBar';
import RemoveFile from '../RemoveFile';
import Assignment from '../Assignment';
import EditAssignment from '../EditAssignment';
import styles from './styles.css';
import currentFile from '../../computed/currentFile';
import currentScene from '../../computed/currentScene';
import isAdminMode from '../../computed/isAdminMode';

@Cerebral({
  isLoading: ['course', 'isLoading'],
  recorder: ['recorder'],
  newFileName: ['course', 'newFileName'],
  showAddFileInput: ['course', 'showAddFileInput'],
  currentAssignmentIndex: ['course', 'currentAssignmentIndex'],
  currentAssignmentStatus: ['course', 'currentAssignmentStatus'],
  completedAssignments: ['user', 'assignmentsSolved'],
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
          <DurationSlider/>
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
