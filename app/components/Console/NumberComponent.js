import React from 'react';
import PropWrapper from './PropWrapper.js';

let NumberStyle = {
  color: '#2196f3'
};

let NumberComponent = React.createClass({
  render() {
    return (
      <PropWrapper prop={this.props.prop} isHidden={this.props.isHidden}>
        <span style={NumberStyle}>{this.props.value}</span>{this.props.appendSeparator ? ',' : ''}
      </PropWrapper>
    );
  }
});

export default NumberComponent;