import React from 'react';
import styles from './ToolbarInput.css';

class ToolbarInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.inputWrapper}>
          <input
          className={styles.input}
          autoFocus
          placeholder={this.props.placeholder}
          onBlur={this.props.onBlur}>
          </input>
        </div>
      </div>
    );
  }
}

export default ToolbarInput;
