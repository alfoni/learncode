import React from 'react';
import mixin from 'cerebral/mixin';
import stopPropagation from './../../utils/stopPropagation.js';
import {
  Paper,
  FontIcon
} from 'material-ui';

let AssignmentStyle = {
  position: 'absolute',
  zIndex: 10,
  top: 45,
  left: 548,
  width: 400
};

let AssignmentContentStyle = {
  lineHeight: '22px',
  padding: 15,
  whiteSpace: 'normal'
};

let CorrectStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  color: '#4CAF50',
  fontSize: '42px'
};

let WrongStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  color: '#F44336',
  fontSize: '42px'
};

let ResultWrapper = {
  position: 'relative',
  paddingLeft: '55px',
  minHeight: '50px',
  whiteSpace: 'normal'
};

let Assignment = React.createClass({
  mixins: [mixin],
  getCerebralState() {
    return {
      assignment: ['course', 'assignment']
    };
  },
  renderResult() {
    if (this.state.assignment.result === true) {
      return (
        <div style={ResultWrapper}>
          <FontIcon 
            style={CorrectStyle}
            className="icon-thumb-up"/>
            You did it! You gained <strong>200</strong> experience points, good work!
        </div>
      );
    }
    if (this.state.assignment.result === false) {
      return 'Assignment has not been run yet';
    }
    return (
        <div style={ResultWrapper}>
          <FontIcon 
            style={WrongStyle}
            className="icon-thumb-down"/>
            {this.state.assignment.result}
        </div>
    );
  },
  renderAssignment() {
    return (
      <div className="arrow_box" style={AssignmentStyle}>
        <Paper style={AssignmentContentStyle}>
          <h2>Assignment</h2>
          {this.state.assignment.description || 'No assignment...'}
          <h3>Result</h3>
          {this.renderResult()}
        </Paper>
      </div>
    );
  },
  render() {
    return (
      <span onClick={stopPropagation}>
        {this.state.assignment.showAssignment ? this.renderAssignment() : null}
      </span>
    );
  }
});

export default Assignment;