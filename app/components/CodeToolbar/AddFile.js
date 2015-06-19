import React from 'react';
import mixin from 'cerebral/mixin';
import stopPropagation from './../../utils/stopPropagation.js';
import {
  TextField,
  FontIcon
} from 'material-ui';

let InputWrapper = {
  position: 'relative',
  display: 'inline-block',
  padding: '10px 0 10px 12px',
  lineHeight: '36px',
  float: 'left',
  boxSizing: 'border-box'
};

let InputPadding = {
  borderRadius: '3px',
  backgroundColor: '#eee',
  padding: '0 10px',
  transition: 'width 0.25s ease-out',
  WebKitTransition: 'width 0.25s ease-out',
  width: 0,
  overflow: 'hidden',
  boxSizing: 'border-box'
};

let InputStyle = {
  backgroundColor: '#eee',
  height: '24px',
  fontSize: '14px',
  border: 0,
  color: 'rgba(0, 0, 0, 0.8)',
  outline: 'none'
};

let AddFile = React.createClass({
  mixins: [mixin],
  getCerebralState() {
    return {
      recorder: ['recorder'],
      showAddFileInput: ['course', 'showAddFileInput'],
      newFileName: ['course', 'newFileName']
    };
  },
  componentDidMount() {
    setTimeout(() => {
      if (this.isMounted()) {
        this.refs.inputPadding.getDOMNode().style.width = '150px';
        this.refs.input.getDOMNode().focus();
      }
    }, 0);
  },
  onChange(event) {
    this.signals.addFileChanged(event.target.value);
  },
  onKeyDown(event) {
    if (event.keyCode === 27) {
      this.signals.addFileAborted();
    } else if (event.keyCode === 13) {
      this.signals.addFileSubmitted();
    }
  },
  render() {
    return (
      <div style={InputWrapper} onClick={stopPropagation}>
        <div ref="inputPadding" style={InputPadding}>
          <input 
            value={this.state.newFileName}
            placeholder="Type filename..."
            ref="input" 
            style={InputStyle}
            onKeyDown={this.onKeyDown}
            onChange={this.onChange}/>
        </div>
      </div>
    );
  }
});

export default AddFile;