import React from 'react';
import mixin from 'cerebral/mixin';
import CodeMirror from 'codemirror';

let CodeWrapperStyle = {
  position: 'relative',
  display: 'inline-block',
  height: 'calc(100% - 86px)'
};

let CodeStyle = {
  height: 'calc(100% - 172px)'
};

let LabelWrapper = {
  position: 'relative',
  backgroundColor: '#f7f7f7',
  lineHeight: '26px',
  fontFamily: 'Roboto',
  color: 'rgba(0,0,0,0.4)',
  padding: '5px 10px',
  height: '36px',
  boxSizing: 'border-box'
};

let AssignmentTextStyle = {
  height: '100px',
  paddingLeft: '29px',
  borderBottom: '2px solid #f7f7f7',
  backgroundColor: '#f7f7f7',
  boxSizing: 'border-box',
  overflow: 'hidden'
};

let TextAreaWrapperStyle = {
  backgroundColor: '#FFF',
  padding: '10px',
  boxSizing: 'border-box',
  height: '100%'
};

let TextAreaStyle = {
  border: 0,
  fontFamily: 'monospace',
  fontSize: '14px',
  backgroundColor: '#FFF',
  height: '100%',
  width: '100%',
  resize: 'none',
  outline: 'none'
};

let AssignmentEditor = React.createClass({
  mixins: [mixin],
  codemirror: null,
  getCerebralState() {
    return {
      assignment: ['course', 'assignment']
    };
  },
  componentDidMount() {
    this.codemirror = CodeMirror(this.refs.code.getDOMNode(), {
      value: this.state.assignment.code,
      mode: 'javascript',
      theme: 'learncode',
      lineNumbers: true,
      tabSize: 2
    });
    this.codemirror.on('change', this.onEditorChange);
    this.codemirror.focus();
  },
  onEditorChange(instance, event) {
    this.signals.assignmentCodeChanged(this.codemirror.getDoc().getValue());
  },
  onTextareaChange(event) {
    this.signals.assignmentDescriptionChanged(event.target.value);
  },
  render() {
    CodeWrapperStyle.width = this.props.width;
    return (
      <div style={CodeWrapperStyle}>
        <div style={LabelWrapper}>
          ASSIGNMENT DESCRIPTION
        </div>
        <div style={AssignmentTextStyle}>
          <div style={TextAreaWrapperStyle}>
            <textarea 
              style={TextAreaStyle} 
              onChange={this.onTextareaChange} 
              value={this.state.assignment.description}></textarea>
          </div>
        </div>
        <div style={LabelWrapper}>
          ASSIGNMENT TEST
        </div>
        <div style={CodeStyle} ref="code"/>
      </div>
    );
  }
});

export default AssignmentEditor;
