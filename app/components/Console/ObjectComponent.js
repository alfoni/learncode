import React from 'react';
import mixin from 'cerebral/mixin';
import PropWrapper from './PropWrapper.js';

let ObjectComponent = React.createClass({
  mixins: [mixin],
  onObjectClick() {
    this.signals.consoleLogClicked(this.props.logIndex, this.props.path);
  },
  render () {
    if (this.props.expand) {
      return (
        <PropWrapper prop={this.props.prop} isHidden={this.props.isHidden}>
          <div onClick={this.onObjectClick} style={{cursor: 'pointer'}}>
            {this.props.children.length ? '▾ ' : ''}
            <strong>{this.props.value}</strong>  {'{'}
          </div>
          <div>{this.props.children}</div>
          <div>{'}' + (this.props.appendSeparator ? ',' : '')}</div>
        </PropWrapper>
      );  
    } else {
      return (
        <PropWrapper prop={this.props.prop} isHidden={this.props.isHidden}>
          <div onClick={this.onObjectClick} style={{cursor: 'pointer'}}>
            {this.props.children.length ? '▸ ' : ''}
            <strong>{this.props.value}</strong> {'{}' + (this.props.appendSeparator ? ',' : '')}
          </div>
        </PropWrapper>
      );        
    }

  }
});

export default ObjectComponent;