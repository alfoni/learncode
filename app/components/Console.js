import React from 'react';
import mixin from 'cerebral/mixin';
import assign from './../utils/assign.js';
import ObjectComponent from './Console/ObjectComponent.js';
import ArrayComponent from './Console/ArrayComponent.js';
import StringComponent from './Console/StringComponent.js';
import NumberComponent from './Console/NumberComponent.js';
import BooleanComponent from './Console/BooleanComponent.js';
import FunctionComponent from './Console/FunctionComponent.js';
import ErrorComponent from './Console/ErrorComponent.js';

let types = {
  object: ObjectComponent,
  array: ArrayComponent,
  string: StringComponent,
  number: NumberComponent,
  boolean: BooleanComponent,
  'function': FunctionComponent,
  error: ErrorComponent
};

let LogStyle = {
  borderBottom: '1px solid #DDD',
  paddingBottom: '5px',
  marginBottom: '5px'
};

let ConsoleStyle = {
  position: 'absolute',
  fontFamily: 'monospace',
  borderLeft: '2px solid #EEE',
  color: '#333',
  fontSize: '14px',
  padding: '10px',
  boxSizing: 'border-box',
  top: '122px',
  right: 0,
  zIndex: 0,
  backgroundColor: '#f7f7f7',
  height: 'calc(100% - 122px)'
};

let Console = React.createClass({
  mixins: [mixin],
  getCerebralState() {
    return {
      logs: ['course', 'logs']
    };
  },
  renderLog(value, index, logIndex) {
    return (
      React.createElement(
        types[value.type], 
        assign({}, value, {
          key: index,
          logIndex: logIndex,
          style: {borderBottom: '1px solid #333'}
        }), 
        value.children.map(function (value, index) {
          return this.renderLog(value, index, logIndex); // Use top index
        }, this)
      )
    );
  },
  render() {
    ConsoleStyle.width = this.props.width;
    return (
      <div style={ConsoleStyle}>
        {this.state.logs.map(function (value, index) {
          return (
            <div style={LogStyle} key={index}>
              {this.renderLog(value, index, index)}
            </div>
          );
        }, this)}
      </div>
    );
  }
});

export default Console;