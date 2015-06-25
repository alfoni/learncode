import React from 'react';

let PropStyle = {
  display: 'inline-block',
  verticalAlign: 'top',
  marginLeft: '10px',
  marginRight: '5px'
};

let ValueStyle = {
  display: 'inline-block'
};

let PropWrapper = React.createClass({
  render() {

    if (this.props.prop) {
      return (
        <div style={{opacity: this.props.isHidden ? 0.5 : 1}}>
          <div style={PropStyle}>{this.props.prop}:</div>
          <div style={ValueStyle}>{this.props.children}</div>
        </div>
      );  
    } else {
      return (
        <div>{this.props.children}</div>
      );
    }
    
  }
});

export default PropWrapper;