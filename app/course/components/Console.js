import React from 'react';
import styles from './Console.css';

function Console() {
  return (
    <div className={this.props.show ? styles.wrapper : styles.wrapperHidden}></div>
  );
}

export default Console;
