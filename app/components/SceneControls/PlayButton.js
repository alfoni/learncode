import React from 'react';
import mixin from 'cerebral/mixin';
import {
  FloatingActionButton
} from 'material-ui';

let PlayButtonStyle = {
  position: 'absolute',
  bottom: '25px',
  right: '25px',
  zIndex: '1'
};

let PlayButton = React.createClass({
  mixins: [mixin],
  getCerebralState() {
    return ['recorder'];
  },
  render() {
    PlayButtonStyle.right = this.state.recorder.isRecording ? '-50px' : '25px';
    return (
      <FloatingActionButton 
        style={PlayButtonStyle}
        iconClassName={this.state.recorder.isPlaying ? "icon-pause" : "icon-play"}
        mini={this.state.recorder.isPlaying || this.state.recorder.isRecording}
        disabled={!this.state.recorder.hasRecording}
        secondary={true} 
        onClick={this.props.onClick}/>
    );
  }
});

export default PlayButton;