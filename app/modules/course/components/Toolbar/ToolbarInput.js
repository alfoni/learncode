import React from 'react';
import styles from './ToolbarInput.css';

class ToolbarInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      this.props.show ?
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
      :
        null
    );
  }
}

export default ToolbarInput;
