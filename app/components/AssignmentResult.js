import React from 'react';
import mixin from 'cerebral/mixin';

let AssignmentResultStyle = {
  position: 'absolute',
  fontFamily: 'monospace',
  color: '#333',
  fontSize: '14px',
  padding: '15px',
  boxSizing: 'border-box',
  top: '86px',
  right: 0,
  zIndex: 0,
  backgroundColor: '#EEE',
  height: 'calc(100% - 86px)'
};

let Console = React.createClass({
  mixins: [mixin],
  getCerebralState() {
    return {
      assignment: ['course', 'assignment']
    };
  },
  renderApproved() {
    return <h1>Yay, you did it!</h1>;
  },
  renderFailed() {
    return (
      <div>
        <h3>Sorry, something is wrong</h3>
        <h4>{this.state.assignment.result}</h4>
      </div>
    );
  },
  render() {
    AssignmentResultStyle.width = this.props.width;
    return (
      <div style={AssignmentResultStyle}>
        {this.state.assignment.result === true ? this.renderApproved() : this.renderFailed()}
      </div>
    );
  }
});

export default Console;