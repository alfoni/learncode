import React from 'react';
import Cerebral from 'cerebral/decorator';
import {
  Slider
}
from 'material-ui';

let DurationSlider = React.createClass({
  render() {
    return (
      <div style={{
        padding: '3px 10px',
        backgroundColor: '#EEE',
        zIndex: '1'
      }}>
        <Slider name="duration" style={{
          margin: '0'
        }}/>
      </div>
    );
  }
});

export default DurationSlider;
