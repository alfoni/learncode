import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import Module from './Scene/Module.js';
import ModuleToolbar from './Scene/ModuleToolbar.js';
import ModuleFileName from './Scene/ModuleFileName.js';
import ModuleAddressbar from './Scene/ModuleAddressbar.js';
import CodeEditor from './Scene/CodeEditor.js';
import Preview from './Scene/Preview.js';
import Console from './Scene/Console.js';
import AssignmentDescriptionTextArea from './Scene/AssignmentDescriptionTextArea.js';
import AssignmentEditor from './Scene/AssignmentEditor.js';
import RemoveFile from './Scene/RemoveFile.js';
import styles from './Scene.css';

@Cerebral({
  isLoading: ['course', 'isLoading'],
  showPreview: ['course', 'showPreview'],
  showConsole: ['course', 'showConsole'],
  showEditAssignment: ['course', 'showEditAssignment'],
  recorder: ['course', 'recorder']
}, {
  currentFile: ['currentFile'],
  currentScene: ['currentScene']
})
class Scene extends React.Component {
  assignmentDescriptionChanged(e) {
    this.props.signals.course.assignmentDescriptionChanged.sync({
      description: e.target.value
    });
  }
  render() {
    return (
      <div className={this.props.showEditAssignment ? styles.threeColumns : styles.twoColumns}>
        <Module show={this.props.showEditAssignment}>
          <ModuleToolbar title="OPPGAVE BESKRIVELSE"/>
          <AssignmentDescriptionTextArea
            value={this.props.currentScene.assignment.description}
            onChange={(e) => this.assignmentDescriptionChanged(e)}/>
          <ModuleToolbar title="OPPGAVE TEST"/>
          <AssignmentEditor/>
        </Module>
        <Module show={Boolean(true)}>
          <ModuleToolbar title="KODE EDITOR">
            <ModuleFileName fileName={this.props.currentFile.name}/>
          </ModuleToolbar>
          <RemoveFile show={this.props.currentScene.currentFileIndex !== 0} onClick={() => this.props.signals.course.removeFileClicked()}/>
          <CodeEditor/>
        </Module>
        <Module show={Boolean(true)}>
          <ModuleToolbar title="NETTLESER">
            <ModuleAddressbar url={process.env.NODE_ENV === 'production' ? 'http://sandbox.kodeboksen.no' : 'http://sandbox.kodeboksen.dev:3000'}/>
          </ModuleToolbar>
          <Preview show={this.props.showPreview}/>
          <Console show={this.props.showConsole}/>
        </Module>
      </div>
    );
  }
}

export default Scene;
