import React from 'react';
import mixin from 'cerebral/mixin';
import Assignment from './Assignment.js';
import assign from './../../utils/assign.js';
import {
  FontIcon
} from 'material-ui';

let ToolbarStyle = {
  float: 'left',
  lineHeight: '56px'
};

let FontIconStyle = {
  float: 'left',
  paddingLeft: '24px',
  lineHeight: '56px',
  color: 'rgba(0, 0, 0, 0.4)',
  cursor: 'pointer'
};

let AssignmentToolbar = React.createClass({
  mixins: [mixin],
  getCerebralState() {
    return {
      assignment: ['course', 'assignment']
    };
  },
  onAssignmentClick() {
    setTimeout(() => {
      this.signals.assignmentClicked();
    }, 0);
  },
  render() {

    let ViewStyle = assign({}, FontIconStyle, {

    });
    let EditStyle = assign({}, FontIconStyle, {
      color: this.state.assignment.showEditor ? 'rgb(255, 64, 129)' : 'rgba(0, 0, 0, 0.4)'
    });
    let RunStyle = assign({}, FontIconStyle, {

    });
    let ViewHoverColor = 'rgba(0, 0, 0, 0.8)';
    let EditHoverColor = 'rgba(0, 0, 0, 0.8)';
    let RunHoverColor = 'rgba(0, 0, 0, 0.8)';
    /*
    FontIconStyle.color = this.state.showBrowser ? 'rgb(255, 64, 129)' : 'rgba(0, 0, 0, 0.4)';
    FontIconStyle.cursor = this.state.showBrowser ? 'default' : 'pointer';
    let hoverColor = this.state.showBrowser ? 'rgb(255, 64, 129)' : 'rgba(0, 0, 0, 0.8)'
    */
    return (
      <div style={ToolbarStyle}>
        <FontIcon 
          style={ViewStyle} 
          hoverColor={ViewHoverColor}
          onClick={this.onAssignmentClick}
          className="icon-assignment-view"/>
        <Assignment/>
        <FontIcon 
          style={RunStyle} 
          hoverColor={RunHoverColor} 
          className="icon-assignment-run"
          onClick={this.signals.runAssignmentClicked}/>
        <FontIcon 
          style={EditStyle} 
          hoverColor={EditHoverColor} 
          className="icon-assignment-edit"
          onClick={this.signals.editAssignmentClicked}/>
      </div>
    );
  }
});

export default AssignmentToolbar;