import './../../node_modules/codemirror/lib/codemirror.css';
import React from 'react';
import batchCalls from 'batchcalls';
import mixin from 'cerebral/mixin';
import CodeMirror from 'codemirror';
import FileName from './Code/FileName.js';
import DeleteFile from './Code/DeleteFile.js';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/xml/xml';
import path from 'path';

let CodeWrapperStyle = {
  position: 'relative',
  display: 'inline-block',
  height: 'calc(100% - 86px)'
};

let CodeStyle = {
  height: 'calc(100% - 36px)'
};

let FileWrapperStyle = {
  position: 'relative',
  backgroundColor: '#f7f7f7',
  lineHeight: '26px',
  fontFamily: 'Roboto',
  color: 'rgba(0,0,0,0.4)',
  padding: '5px 10px',
  height: '36px',
  boxSizing: 'border-box'
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
    this.codemirror.setOption('mode', this.getMode());
    this.isMutatingCode = true;
    doc.setValue(code);
    this.isMutatingCode = false;

    if (!this.state.recorder.isPlaying) {
      this.codemirror.focus();
      this.codemirror.setCursor(this.codemirror.lineCount(), 0);
    }
  },
  getMode() {
    let extension = path.extname(this.state.course.currentFileName);
    switch (extension) {
      case '.html':
        return 'xml';
      case '.js':
        return 'javascript';
      case '.css':
        return 'css';
    }
  },
  componentDidMount() {
    this.codemirror = CodeMirror(this.refs.code.getDOMNode(), {
      value: this.getCode(),
      mode: this.getMode(),
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
    CodeWrapperStyle.width = this.props.width;
    return (
      <div style={CodeWrapperStyle}>
        <div style={FileWrapperStyle}>
          CODE EDITOR
          <DeleteFile/>
          <FileName/>
        </div>
        <div style={CodeStyle} ref="code"/>
      </div>
    );
  }
});

export default Code;
