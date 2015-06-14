import './../../node_modules/codemirror/lib/codemirror.css';
import React from 'react';
import batchCalls from 'batchcalls';
import mixin from 'cerebral/mixin';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';

let Code = React.createClass({
  mixins: [mixin],
  codemirror: null,
  canUpdate: true,
  getCerebralState() {
    return ['code', 'lastEvent', 'recorder'];
  },
  componentDidUpdate(prevProps, prevState) {
    if (this.state.recorder.isPlaying && this.state.lastEvent !== prevState.lastEvent) {
      this.updateCode(this.state.lastEvent);
    }

    // Have to do this async as the updateCode is async
    if (
      (this.state.recorder.started !== prevState.recorder.started)) {
      setTimeout(function () {
        var code = this.state.code;
        var doc = this.codemirror.getDoc();
        this.isMutatingCode = true;
        doc.setValue(code);
        this.isMutatingCode = false;
      }.bind(this), 0);
    }
  },
  componentDidMount() {
    this.codemirror = CodeMirror(this.refs.code.getDOMNode(), {
      value: '',
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
