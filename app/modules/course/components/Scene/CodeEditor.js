import '!style!css!./../../../../../node_modules/codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import '!style!css!./CodeEditorStyle.css';

import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import CodeMirror from 'codemirror';
import path from 'path';
import styles from './CodeEditor.css';
import currentScene from '../../computed/currentScene';
import currentFile from '../../computed/currentFile';

@Cerebral({
  recorder: ['recorder'],
  currentSceneIndex: ['course', 'currentSceneIndex'],
  codeSelection: ['course', 'codeSelection'],
  currentScene: currentScene,
  currentFile: currentFile
})
class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.onCursorActivity = this.onCursorActivity.bind(this);
  }
  componentDidMount() {
    this.codemirror = CodeMirror(this.refs.code, {
      value: this.getCode(),
      mode: this.getMode(),
      theme: 'learncode',
      lineNumbers: true,
      tabSize: 2
    });
    this.codemirror.on('change', this.onEditorChange);
    this.codemirror.on('cursorActivity', this.onCursorActivity);
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.recorder.isPlaying ||
      this.props.recorder.started !== prevProps.recorder.started ||
      this.props.currentScene.currentFileIndex !== prevProps.currentScene.currentFileIndex ||
      this.props.currentSceneIndex !== prevProps.currentSceneIndex ||
      this.props.recorder.currentSeek !== prevProps.recorder.currentSeek
    ) {
      this.updateAllCode();
    }

    if (this.props.recorder.isPlaying && !prevProps.recorder.isPlaying) {
      this.codemirror.setOption('readOnly', 'nocursor');
    } else if (!this.props.recorder.isPlaying && prevProps.recorder.isPlaying) {
      this.codemirror.setOption('readOnly', false);
    }

    if (this.props.recorder.isPlaying) {
      this.codemirror.getDoc().setSelection(this.props.codeSelection.anchor, this.props.codeSelection.head);
    }
  }
  onCursorActivity() {
    const range = this.codemirror.getDoc().listSelections()[0];

    this.props.signals.course.codeCursorChanged({
      anchor: range.anchor,
      head: range.head
    });
  }
  getCode() {
    return this.props.currentFile.code || '';
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
      '.html': 'htmlmixed',
      '.js': 'javascript',
      '.css': 'css'
    };

    const extension = path.extname(this.props.currentScene.sandboxFiles[this.props.currentScene.currentFileIndex].name);

    return modes[extension] || 'xml';
  }
  onEditorChange(instance, event) {
    if (!this.isMutatingCode) {
      if (event.text.length === 2) {
        event.text = ['\n'];
      }

      this.props.signals.course.codeChanged({
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
