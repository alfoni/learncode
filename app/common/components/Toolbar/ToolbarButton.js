import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import styles from './ToolbarButton.css';
import Tooltip from 'common/components/Toolbar/Tooltip.js';

@Cerebral()
class ToolbarButton extends React.Component {
  constructor() {
    super();
    this.state = {
      showTooltip: false,
      timeout: null
    };
  }
  showTooltip() {
    const self = this;
    this.setState({
      timeout: setTimeout(() => {
        self.setState({
          showTooltip: true
        });
      }, 1000)
    });
  }
  hideTooltip() {
    clearTimeout(this.state.timeout);
    this.setState({
      timeout: null,
      showTooltip: false
    });
  }
  render() {
    return (
      <button className={styles.button} onClick={this.props.onClick}>
        <Tooltip show={this.state.showTooltip && this.props.tooltip} text={this.props.tooltip}/>
        {
          this.props.title ?
            <span className={styles.title}>
              {this.props.title}
              <span className={styles.caret}>&#9660;</span>
            </span>
          :
          <div
            className={this.props.active ? styles.activeIcon : styles.icon}
            onMouseOver={() => this.showTooltip()}
            onMouseOut={() => this.hideTooltip()}>
            <div className={this.props.icon}></div>
          </div>
        }
      </button>
    );
  }
}

export default ToolbarButton;
