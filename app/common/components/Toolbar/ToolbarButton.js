import React from 'react';
import styles from './ToolbarButton.css';

function ToolbarButton(props) {
  return (
    <button className={styles.button}>
      {
        props.title ?
          <span className={styles.title} onClick={props.onClick}>
            {props.title}
            <span className={styles.caret}>&#9660;</span>
          </span>
        :
          <div className={props.active ? styles.activeIcon : styles.icon}>
            <div className={props.icon} onClick={props.onClick}></div>
          </div>
      }
    </button>
  );
}

export default ToolbarButton;
