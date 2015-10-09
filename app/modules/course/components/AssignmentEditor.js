import '!style!css!./../../../../node_modules/codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/xml/xml.js';
import '!style!css!./CodeEditor/CodeEditorStyle.css';

import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import CodeMirror from 'codemirror';
import styles from './AssignmentEditor.css';

@Cerebral({
  recorder: ['course', 'recorder'],
  currentScene: ['course', 'currentScene']
})
class AssignmentEditor extends React.Component {
  constructor(props) {
    super(props);
    this.onEditorChange = this.onEditorChange.bind(this);
  }
  componentDidMount() {
    this.codemirror = CodeMirror(this.refs.code, {
      value: this.getCode(),
      mode: 'javascript',
      theme: 'learncode',
      lineNumbers: true,
      tabSize: 2
    });
    this.codemirror.on('change', this.onEditorChange);
  }
  componentDidUpdate(prevProps) {
    if (this.props.recorder.isPlaying ||
    this.props.recorder.started !== prevProps.recorder.started ||
    this.props.currentScene.assignment.code !== prevProps.currentScene.assignment.code) {
      this.updateAllCode();
    }
  }
  updateAllCode() {
    const doc = this.codemirror.getDoc();
    const code = this.getCode();
    this.isMutatingCode = true;
    doc.setValue(code);
    this.isMutatingCode = false;

    if (!this.props.recorder.isPlaying) {
      this.codemirror.focus();
      this.codemirror.setCursor(this.codemirror.lineCount(), 0);
    }
  }
  onEditorChange() {
    this.props.signals.course.assignmentCodeChanged({code: this.codemirror.getDoc().getValue()});
  }
  getCode() {
    const assignment = this.props.currentScene.assignment;

    if (assignment && assignment.code) {
      return assignment.code;
    }

    return '';
  }
  render() {
    return (
      <div className={styles.wrapper} ref="code"></div>
    );
  }
}

export default AssignmentEditor;
