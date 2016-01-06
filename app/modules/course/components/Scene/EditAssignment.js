import React from 'react';
import styles from './EditAssignment.css';
import CodeMirror from 'codemirror';
import '!style!css!./../../../../../node_modules/codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript.js';
import '!style!css!common/CodeEditorStyle.css';

class EditAssignment extends React.Component {
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
    if (
      prevProps.currentAssignmentIndex !== this.props.currentAssignmentIndex ||
      prevProps.currentScene.index !== this.props.currentScene.index
    ) {
      this.updateAllCode();
    }
  }
  updateAllCode() {
    const doc = this.codemirror.getDoc();
    const code = this.getCode();
    doc.setValue(code);
  }
  onEditorChange() {
    this.props.onCodeChange({code: this.codemirror.getDoc().getValue()});
  }
  getCode() {
    return this.props.assignment.code;
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <textarea
          value={this.props.assignment.description}
          className={styles.textarea}
          onChange={(event) => this.props.onDescriptionChange({description: event.target.value})}/>
        <div className={styles.editor} ref="code"></div>
        <div className={styles.result}>
          <button
            className={styles.run}
            onClick={() => this.props.onAssignmentRunClick()}>Kjør oppgaven</button>
          <p className={styles.resultText}>
            {
              this.props.currentAssignmentStatus.result === true ?
                'Du klarte det! Bra jobba!'
              :
                this.props.currentAssignmentStatus.result
            }
          </p>
        </div>
      </div>

    );
  }
}

export default EditAssignment;
