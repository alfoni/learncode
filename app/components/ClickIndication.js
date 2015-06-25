import React from 'react';
import mixin from 'cerebral/mixin';

let ClickStyle = {
  position: 'fixed',
  padding: '5px 5px 3px 5px',
  transform: 'scale(1)',
  border: '3px solid rgb(255, 64, 129)',
  borderRadius: '50%',
  opacity: 0
};

let InnerClickStyle = {
  padding: '10px',
  display: 'inline-block',
  backgroundColor: 'rgb(255, 64, 129)',
  borderRadius: '50%'
};

let ClickIndication = React.createClass({
  mixins: [mixin],
  getInitialState() {
    return {
      doTransition: false
    };
  },
  componentWillUpdate(nextProps, nextState) {
    if (this.state.position !== nextState.position) {
      this.refs.indicator.getDOMNode().removeEventListener('animationend', this.resetIndicator);
      this.refs.indicator.getDOMNode().addEventListener('animationend', this.resetIndicator);
      this.setState({
        doTransition: true
      });
    }
  },
  getCerebralState() {
    return {
      position: ['course', 'lastClick']
    };
  },
  resetIndicator() {
    this.setState({
      doTransition: false
    });
  },
  render() {

    if (this.state.position) {
      ClickStyle.left = (this.state.position.x - 18) + 'px';
      ClickStyle.top = (this.state.position.y - 18) + 'px';
    }

    ClickStyle.opacity = this.state.doTransition ? 1 : 0;
    ClickStyle.animation = this.state.doTransition ? 'pulse 1.5s forwards' : null;

    return (
      <span ref="indicator" style={ClickStyle}>
        <span style={InnerClickStyle}></span>
      </span>
    );
  }
});

export default ClickIndication;