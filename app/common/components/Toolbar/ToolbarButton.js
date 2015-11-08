import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import style from './ToolbarButton.css';
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
      <button className={style.button} onClick={this.props.onClick}>
        <Tooltip show={this.state.showTooltip && this.props.tooltip} text={this.props.tooltip}/>
        {
          this.props.title ?
            <span>
              {this.props.title}
              <span className={style.caret}>&#9660;</span>
            </span>
          :
          <div
            className={this.props.active ? style.activeIcon : style.icon}
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
