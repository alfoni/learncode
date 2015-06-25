import React from 'react';
import mixin from 'cerebral/mixin';
import {
  Toolbar,
  ToolbarGroup,
  DropDownMenu,
  FontIcon,
  LeftNav,
  MenuItem,
  ToolbarSeparator,
  ToolbarTitle
}
from 'material-ui';

let SandboxWrapperStyle = {
  position: 'relative',
  display: 'inline-block',
  verticalAlign: 'top',
  boxSizing: 'border-box',
  borderLeft: '2px solid #EEE',
  height: 'calc(100% - 86px)',
  paddingTop: '36px'
};

let SandboxStyle = {
  border: 0,
  height: '100%',
};

let AddressBarStyle = {
  height: '24px',
  lineHeight: '26px',
  color: '#AAA',
  fontSize: '14px',
  padding: '0 5px',
  backgroundColor: '#fff',
  borderRadius: '3px',
  display: 'inline-block',
  marginLeft: '10px',
  boxShadow: '0 0 2px 1px rgba(0,0,0,0.05) inset',
  border: '1px solid #ddd'
};

let ToolbarStyle = {
  position: 'absolute',
  backgroundColor: '#f7f7f7',
  height: '36px',
  width: '100%',
  fontFamily: 'Roboto',
  lineHeight: '26px',
  color: 'rgba(0,0,0,0.4)',
  boxSizing: 'border-box',
  top: 0,
  left: 0,
  padding: '5px 10px'
};
 
let Sandbox = React.createClass({
  mixins: [mixin],
  getCerebralState() {
    return ['recorder'];
  },
  componentWillMount() {
    this.context.cerebral.on('sandbox:saved', this.onSandboxSaved);
    window.addEventListener('message', this.onSandboxMessage);
    this.context.cerebral.on('sandbox:click', this.onSandboxClick);
  },
  componentWillUnmount() {
    this.context.cerebral.off('sandbox:saved', this.onSandboxSaved);
    this.context.cerebral.off('sandbox:click', this.onSandboxClick);
    window.removeEventListener('message', this.onSandboxMessage);
  },
  onSandboxSaved() {
    this.refs.sandbox.getDOMNode().src = "http://sandbox.learncode.com:3000";
  },
  onSandboxClick(path) {
    this.refs.sandbox.getDOMNode().contentWindow.postMessage({
      type: 'click',
      args: [path]
    }, 'http://sandbox.learncode.com:3000');
  },
  onSandboxMessage(event) {
    if (!this.state.recorder.isPlaying) {

      let data = event.data;

      if (data.signal === 'appClicked') {
        let offset = this.refs.sandbox.getDOMNode().getBoundingClientRect();
        data.message[0].x +=  offset.left;
        data.message[0].y +=  offset.top;
      }
      
      this.signals[event.data.signal].apply(this.signals, event.data.message);

    }
  },
  render() {
    SandboxWrapperStyle.width = this.props.width;
    return (
      <div style={SandboxWrapperStyle}>
        <div style={ToolbarStyle}>
          BROWSER
          <div style={AddressBarStyle}>http://sandbox.learncode.com:3000</div>
        </div>
        <iframe id="sandbox" style={SandboxStyle} src="about:blank" ref="sandbox"/>
      </div>
    );
  }
});

export default Sandbox;
