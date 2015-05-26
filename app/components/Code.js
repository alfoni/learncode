import './../../node_modules/codemirror/lib/codemirror.css';
import React from 'react';
import mixin from 'cerebral/mixin';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';

let Code = React.createClass({
  mixins: [mixin],
  codemirror: null,
  getCerebralState() {
    return ['code', 'events'];
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
      if (event.text.length === 2) {
        event.text = ['\n'];
      }
      this.signals.codeChanged(event, this.codemirror.getDoc().getValue());
    }
  },
  updateCode() {
    var events = this.state.events;
    var code = this.state.code;
    var doc = this.codemirror.getDoc();
    this.isMutatingCode = true;
    this.codemirror.operation(function() {
      doc.setValue(code)
      events.forEach(function(event) {
        doc.setSelection(event.from, event.to)
        doc.replaceSelections(event.text);
      });
    });
    this.isMutatingCode = false;
  },
  render() {
    if (this.codemirror) {
      this.updateCode();
    }
    return (
      <div ref="code" className="Code"/>
    );
  }
});

export default Code;
