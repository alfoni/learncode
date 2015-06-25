import React from 'react';
import mixin from 'cerebral/mixin';
import PropWrapper from './PropWrapper.js';

let ArrayValueStyle = {
  marginLeft: '10px'
};

let ArrayComponent = React.createClass({
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
            <strong>{this.props.value}</strong>  [
          </div>
          <div>
            {this.props.children.map(function (child, index) {
              return (
                <div key={index} style={ArrayValueStyle}>
                  {
                    React.cloneElement(child, {
                      appendSeparator: index < this.props.children.length - 1
                    }, child.props.children)
                  }
                </div>
              );
            }, this)}
          </div>
          <div>]{this.props.appendSeparator ? ',' : ''}</div>
        </PropWrapper>
      );  
    } else {
      return (
        <PropWrapper prop={this.props.prop} isHidden={this.props.isHidden}>
          <div onClick={this.onObjectClick} style={{cursor: 'pointer'}}>
            {this.props.children.length ? '▸ ' : ''}
            <strong>{this.props.value}</strong> [{this.props.children.length}]{this.props.appendSeparator ? ',' : ''}
          </div>
        </PropWrapper>
      );        
    }

  }
});

export default ArrayComponent;