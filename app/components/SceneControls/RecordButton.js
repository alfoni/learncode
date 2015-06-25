import React from 'react';
import mixin from 'cerebral/mixin';
import {
  FloatingActionButton
} from 'material-ui';

let RecordButtonStyle = {
  position: 'absolute',
  bottom: '25px',
  right: '390px',
  zIndex: '1'
};

let RecordButton = React.createClass({
  mixins: [mixin],
  getCerebralState() {
    return ['recorder'];
  },
  render() {
    RecordButtonStyle.bottom = this.state.recorder.isPlaying ? '-60px' : '25px';
    RecordButtonStyle.right = this.state.recorder.isRecording ? '320px' : '390px';
    return (
      <FloatingActionButton 
        style={RecordButtonStyle}
        iconClassName={this.state.recorder.isRecording ? 'icon-stop' : 'icon-record'}
        label={this.state.recorder.isRecording ? 'stop' : 'record'} 
        primary={true} 
        mini={this.state.recorder.isPlaying}
        onClick={this.props.onClick}/>
    );
  }
});

export default RecordButton;