import React from 'react';
import styles from './ToolbarInput.css';
import ToolbarButton from './ToolbarButton';

class ToolbarInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false
    };
  }
  renderInput() {
    return (
      <div className={styles.inputWrapper}>
        <input
        className={styles.input}
        autoFocus
        placeholder={this.props.placeholder}
        onBlur={() => this.toggleInput()}>
        </input>
      </div>
    );
  }
  toggleInput() {
    this.setState({
      showInput: !this.state.showInput
    });
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <ToolbarButton icon={this.props.icon} onClick={() => this.toggleInput()}/>
        {
          this.state.showInput ?
            this.renderInput()
          : null
        }
      </div>
    );
  }
}

export default ToolbarInput;
