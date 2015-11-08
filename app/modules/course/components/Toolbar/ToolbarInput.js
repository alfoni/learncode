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
            <form onSubmit={this.props.onSubmit}>
              <input
                value={this.props.value}
                onChange={this.props.onChange}
                onKeyDown={this.props.onKeyDown}
                className={styles.input}
                autoFocus
                placeholder={this.props.placeholder}
                onBlur={this.props.onBlur}>
              </input>
            </form>
          </div>
        </div>
      :
        null
    );
  }
}

export default ToolbarInput;
