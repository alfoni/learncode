import React from 'react';
import mixin from 'cerebral/mixin';
import {
  FontIcon
} from 'material-ui';

let FontIconStyle = {
  float: 'left',
  paddingLeft: '24px',
  lineHeight: '56px'
};

let BrowserButton = React.createClass({
  mixins: [mixin],
  getCerebralState() {
    return {
      showBrowser: ['course', 'showBrowser']
    }
  },
  render() {

    FontIconStyle.color = this.state.showBrowser ? 'rgb(255, 64, 129)' : 'rgba(0, 0, 0, 0.4)';
    FontIconStyle.cursor = this.state.showBrowser ? 'default' : 'pointer';
    let hoverColor = this.state.showBrowser ? 'rgb(255, 64, 129)' : 'rgba(0, 0, 0, 0.8)'

    return (
      <FontIcon style={FontIconStyle} hoverColor={hoverColor} className="icon-browser" onClick={this.signals.showBrowserClicked}/>
    );
  }
});

export default BrowserButton;