import React from 'react';
import PropWrapper from './PropWrapper.js';

let BooleanStyle = {
  color: '#2196f3'
};

let BooleanComponent = React.createClass({
  render() {
    return (
      <PropWrapper prop={this.props.prop} isHidden={this.props.isHidden}>
        <span style={BooleanStyle}>{this.props.value.toString()}</span>{this.props.appendSeparator ? ',' : ''}
      </PropWrapper>
    );
  }
});

export default BooleanComponent;