import React from 'react';
import PropWrapper from './PropWrapper.js';

let FunctionStyle = {
  color: '#2196f3'
};

let FunctionComponent = React.createClass({
  render() {
    return (
      <PropWrapper prop={this.props.prop} isHidden={this.props.isHidden}>
        <span style={FunctionStyle}>function</span> {this.props.value} () {'{}'}{this.props.appendSeparator ? ',' : ''}
      </PropWrapper>
    );
  }
});

export default FunctionComponent;