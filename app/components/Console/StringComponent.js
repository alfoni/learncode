import React from 'react';
import PropWrapper from './PropWrapper.js';

let StringStyle = {
  color: '#ff9800'
};

let StringComponent = React.createClass({
  render() {
    return (
      <PropWrapper prop={this.props.prop} isHidden={this.props.isHidden}>
        <span style={StringStyle}>{'"' + this.props.value + '"'}</span>{this.props.appendSeparator ? ',' : ''}
      </PropWrapper>
    );
  }
});

export default StringComponent;