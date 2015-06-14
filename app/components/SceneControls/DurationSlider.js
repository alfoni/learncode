import React from 'react';
import Cerebral from 'cerebral/decorator';
import mixin from 'cerebral/mixin';
import {
  Slider
}
from 'material-ui';

let SliderStyle = {
  margin: '0'
};

let DurationSlider = React.createClass({
  mixins: [mixin],
  getCerebralState() {
    return ['recorder'];
  },
  calculateCurrentDuration() {
    return (1 / this.state.recorder.duration) * this.state.recorder.currentDuration;
  },
  render() {
    
    let value = 0;
    if (this.state.recorder.hasRecording) {
      value = this.calculateCurrentDuration();
    }
    return (
      <div style={{
        padding: '3px 10px',
        backgroundColor: '#EEE',
        zIndex: '1'
      }}>
        <Slider 
          name="duration" 
          min={0}
          max={1}
          onChange={this.props.onSliderChange}
          value={value > 1 ? 1 : value}
          style={SliderStyle} 
          disabled={!this.state.recorder.hasRecording}/>
      </div>
    );
  }
});

export default DurationSlider;