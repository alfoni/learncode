import React from 'react';
import styles from './ToolbarInput.css';

function ToolbarInput(props) {
  return (
    <div className={styles.inputWrapper}>
      <input className={styles.input} placeholder={props.placeholder}></input>
    </div>
  );
}

export default ToolbarInput;
