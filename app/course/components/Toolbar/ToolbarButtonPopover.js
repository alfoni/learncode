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
  componentWillUpdate(nextProps) {
    if (this.props.showFilesPopover && !nextProps.showFilesPopover) {
      window.removeEventListener('click', this.onWindowClick);
    } else if (!this.props.showFilesPopover && nextProps.showFilesPopover) {
      setTimeout(() => window.addEventListener('click', this.onWindowClick), 0);
    }
  }
  onWindowClick(event) {
    if (!propagatedThrough(event, this.refs.popover)) {
      window.removeEventListener('click', this.onWindowClick);
      this.setState({
        showPopover: false
      });
    }
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
        <ToolbarButton icon={this.props.icon} onClick={this.props.onClick}/>
        {
          this.props.show ?
            this.renderPopover()
          :
            null
        }
      </div>
    );
  }
}

export default ToolbarButtonPopover;
