import React from 'react';
import mixin from 'cerebral/mixin';

let FileNameStyle = {
  float: 'right',
  padding: '5px 10px',
  backgroundColor: 'rgb(255, 64, 129)', // rgb(226,226,226)
  borderRadius: '3px',
  lineHeight: 'normal',
  color: '#FFF',
  fontFamily: 'Roboto',
  fontSize: '14px'
};

let FileName = React.createClass({
  mixins: [mixin],
  getCerebralState() {
    return {
      fileName: ['course', 'currentFileName']
    };
  },
  render() {
    return (
      <div style={FileNameStyle}>{this.state.fileName}</div>
    );
  }
});

export default FileName;