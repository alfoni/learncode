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
  renderWithTooltip() {
    return (
      <div>
        <Tooltip show={this.state.showTooltip} text={this.props.tooltip}/>
        <div
          className={this.props.active ? style.activeIcon : style.icon}
          onMouseOver={() => this.showTooltip()}
          onMouseOut={() => this.hideTooltip()}>
          <div className={this.props.icon}></div>
        </div>
      </div>
    );
  }
  renderwithoutTooltip() {
    return (
      <div className={this.props.active ? style.activeIcon : style.icon}>
        <div className={this.props.icon}></div>
      </div>
    );
  }
  render() {
    return (
      <button className={style.button} onClick={this.props.onClick}>
        {
          this.props.tooltip ?
            this.renderWithTooltip()
          :
            this.renderwithoutTooltip()
        }

        {
          this.props.title ?
            <span>
              {this.props.title}
              <span className={style.caret}>&#9660;</span>
            </span>
          :
            null
        }
      </button>
    );
  }
}

export default ToolbarButton;
