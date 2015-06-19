import './../../node_modules/codemirror/lib/codemirror.css';
import React from 'react';
import batchCalls from 'batchcalls';
import mixin from 'cerebral/mixin';
import CodeMirror from 'codemirror';
import FileName from './Code/FileName.js';
import DeleteFile from './Code/DeleteFile.js';
import 'codemirror/mode/javascript/javascript';

let CodeWrapperStyle = {
  position: 'relative',
  display: 'inline-block',
  height: 'calc(100% - 86px)',
  width: '50%'
};

let CodeStyle = {
  height: '100%'
};

let FileWrapperStyle = {
  position: 'absolute',
  top: '5px',
  right: '5px',
  zIndex: 5
};

let Code = React.createClass({
  mixins: [mixin],
  codemirror: null,
  getCerebralState() {
    return ['course', 'recorder'];
  },
  componentDidUpdate(prevProps, prevState) {
    
    // When playing back, update all the code on each change. The transform is done
    // behind the scenes in cerebral
    if (
      this.state.recorder.isPlaying ||
      this.state.recorder.started !== prevState.recorder.started || 
      this.state.course.currentFileIndex !== prevState.course.currentFileIndex
    ) {
      this.updateAllCode();
    }

  },
  getCode() {
    return this.state.course.sandbox[this.state.course.currentFileIndex].code; 
  },
  updateAllCode() {
    var doc = this.codemirror.getDoc();
    var code = this.getCode();
    this.isMutatingCode = true;
    doc.setValue(code);
    this.isMutatingCode = false;

    if (!this.state.recorder.isPlaying) {
      this.codemirror.focus();
      this.codemirror.setCursor(this.codemirror.lineCount(), 0);
    }
  },
  componentDidMount() {
    this.codemirror = CodeMirror(this.refs.code.getDOMNode(), {
      value: this.getCode(),
      mode: 'javascript',
      theme: 'learncode',
      lineNumbers: true,
      tabSize: 2
    });
    this.codemirror.on('change', this.onEditorChange);
    this.codemirror.focus();
  },
  onEditorChange(instance, event) {
    if (!this.isMutatingCode) {

      // fix line breaks
      if (event.text.length === 2) {
        event.text = ['\n'];
      }
      
      this.signals.codeChanged({
        from: event.from,
        to: event.to,
        text: event.text
      });
    }
  },
  render() {
    return (
      <div style={CodeWrapperStyle}>
        <div style={CodeStyle} ref="code"/>
        <div style={FileWrapperStyle}>
          <DeleteFile/>
          <FileName/>
        </div>
      </div>
    );
  }
});

export default Code;
