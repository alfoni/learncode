import '!style!css!./../../../../node_modules/codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/xml/xml.js';
import '!style!css!./CodeEditor/CodeEditorStyle.css';

import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import CodeMirror from 'codemirror';
import path from 'path';
import styles from './CodeEditor.css';

@Cerebral({
  recorder: ['course', 'recorder'],
  currentFileIndex: ['course', 'currentFileIndex'],
  sandboxFiles: ['course', 'sandboxFiles'],
  currentFileName: ['course', 'currentFileName']
})
class CodeEditor extends React.Component {
  componentDidMount() {
    this.codemirror = CodeMirror(this.refs.code, {
      value: this.getCode(),
      mode: this.getMode(),
      theme: 'learncode',
      lineNumbers: true,
      tabSize: 2
    });
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.recorder.isPlaying ||
      this.props.recorder.started !== prevProps.recorder.started ||
      this.props.currentFileIndex !== prevProps.currentFileIndex
    ) {
      this.updateAllCode();
    }
  }
  getCode() {
    return this.props.sandboxFiles[this.props.currentFileIndex].code;
  }
  updateAllCode() {
    const doc = this.codemirror.getDoc();
    const code = this.getCode();
    this.codemirror.setOption('mode', this.getMode());
    this.isMutatingCode = true;
    doc.setValue(code);
    this.isMutatingCode = false;

    if (!this.props.recorder.isPlaying) {
      this.codemirror.focus();
      this.codemirror.setCursor(this.codemirror.lineCount(), 0);
    }
  }
  getMode() {
    const modes = {
      '.html': 'xml',
      '.js': 'javascript',
      '.css': 'css'
    };
    const extension = path.extname(this.props.currentFileName);

    return modes[extension] || 'xml';
  }
  onEditorChange(instance, event) {
    if (!this.isMutatingCode) {
      if (event.text.length === 2) {
        event.text = ['\n'];
      }

      this.props.signals.codeChanged({
        from: event.from,
        to: event.to,
        text: event.text
      });
    }
  }
  render() {
    return (
      <div ref="code" className={styles.editor}/>
    );
  }
}

export default CodeEditor;
