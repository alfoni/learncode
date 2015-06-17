import './../../node_modules/codemirror/lib/codemirror.css';
import React from 'react';
import batchCalls from 'batchcalls';
import mixin from 'cerebral/mixin';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';

let Code = React.createClass({
  mixins: [mixin],
  codemirror: null,
  getCerebralState() {
    return ['course', 'recorder'];
  },
  componentDidUpdate(prevProps, prevState) {
    
    if (this.state.recorder.started !== prevState.recorder.started || this.state.course.code !== prevState.course.code) {
      this.updateAllCode();
    }

    if (!this.triggeredBySignal && this.state.course.lastEvent && this.state.course.lastEvent !== prevState.course.lastEvent) {
      this.updateCode(this.state.course.lastEvent);
    } else if (this.triggeredBySignal) {
      this.triggeredBySignal = false;
    }

  },
  updateAllCode() {
    var code = this.state.course.code;
    var doc = this.codemirror.getDoc();
    this.isMutatingCode = true;
    doc.setValue(code);
    this.isMutatingCode = false;
  },
  componentDidMount() {
    this.codemirror = CodeMirror(this.refs.code.getDOMNode(), {
      value: this.state.course.code,
      mode: 'javascript',
      theme: 'learncode',
      lineNumbers: true,
      tabSize: 2
    });
    this.codemirror.on('change', this.onEditorChange);
  },
  onEditorChange(instance, event) {
    if (!this.isMutatingCode) {

      // fix line breaks
      if (event.text.length === 2) {
        event.text = ['\n'];
      }
      this.triggeredBySignal = true;
      this.signals.codeChanged(event, this.codemirror.getDoc().getValue());
    }
  },
  updateCode: batchCalls(function (events) {

    var doc = this.codemirror.getDoc();
    this.isMutatingCode = true;
    this.codemirror.operation(function () {
          
      events.forEach(function (event) {
        
        doc.setSelection(event.from, event.to)
        doc.replaceSelections(event.text);
        
      }, this);

    }.bind(this));
    this.isMutatingCode = false;

  }),
  render() {
    return (
      <div ref="code" className="Code"/>
    );
  }
});

export default Code;
