import React from 'react';
import ToolbarButton from './ToolbarButton';
import styles from './ToolbarButtonPopover.css';
import {propagatedThrough} from 'common/utils';

class ToolbarButtonPopover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopover: false
    };
    this.onWindowClick = this.onWindowClick.bind(this);
  }
  onWindowClick(event) {
    if (!propagatedThrough(event, this.refs.popover)) {
      window.removeEventListener('click', this.onWindowClick);
      this.setState({
        showPopover: false
      });
    }
  }
  togglePopover() {
    if (this.state.showPopover) {
      window.removeEventListener('click', this.onWindowClick);
    } else {
      setTimeout(() => window.addEventListener('click', this.onWindowClick), 0);
    }

    this.setState({showPopover: !this.state.showPopover});
  }
  renderPopover() {
    return (
      <div ref="popover" className={styles.arrowBox}>
        <div className={styles.contentBox}>
          {this.props.children}
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <ToolbarButton icon={this.props.icon} onClick={() => this.togglePopover()}/>
        {
          this.state.showPopover ?
            this.renderPopover()
          :
            null
        }
      </div>
    );
  }
}

export default ToolbarButtonPopover;
