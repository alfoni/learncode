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
  onClick(e) {
    e.stopPropagation();
    this.props.signals.course.buttonPopoverClicked({
      mousePositionX: e.clientX,
      mousePositionY: e.clientY
    });
    this.props.onClick();
  }
  renderTextButton() {
    return (
      <span className={styles.title}>
        {this.props.title}
        <span className={styles.caret}>&#9660;</span>
      </span>
    );
  }
  renderIconTextButton() {
    return (
      <div
        className={this.props.active ? styles.activeTextIcon : styles.textIcon}
        onMouseOver={() => this.showTooltip()}
        onMouseOut={() => this.hideTooltip()}>
        <div className={this.props.icon}></div>
        <div className={styles.iconTitle}>{this.props.title}</div>
      </div>
    );
  }
  renderIconButton() {
    return (
      <div
        className={this.props.active ? styles.activeIcon : styles.icon}
        onMouseOver={() => this.showTooltip()}
        onMouseOut={() => this.hideTooltip()}>
        <div className={this.props.icon}></div>
      </div>
    );
  }
  render() {
    return (
      <button className={styles.button} onClick={(e) => this.onClick(e)}>
        <Tooltip show={this.state.showTooltip && this.props.tooltip} text={this.props.tooltip}/>
        { this.props.title && !this.props.icon ? this.renderTextButton() : null }
        { this.props.title && this.props.icon ? this.renderIconTextButton() : null }
        { !this.props.title && this.props.icon ? this.renderIconButton() : null }
      </button>
    );
  }
}

export default ToolbarButton;
