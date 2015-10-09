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
  assignment: ['course', 'currentScene', 'assignment']
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
  onEditorChange() {
    this.props.signals.course.assignmentCodeChanged({code: this.codemirror.getDoc().getValue()});
  }
  getCode() {
    const assignment = this.props.assignment;

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
