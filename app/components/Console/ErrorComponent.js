import React from 'react';
import PropWrapper from './PropWrapper.js';

let ErrorStyle = {
  color: '#F44336'
};

let ErrorComponent = React.createClass({
  render() {
    return (
      <PropWrapper prop={this.props.prop} isHidden={this.props.isHidden}>
        <div style={ErrorStyle}>{this.props.value.message}</div>
        <div>
          {this.props.value.stack.map(function (stack, index) {
            return <div key={index}>{stack}</div>
          })}
        </div>
      </PropWrapper>
    );
  }
});

export default ErrorComponent;