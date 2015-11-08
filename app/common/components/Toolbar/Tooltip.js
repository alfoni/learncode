import React from 'react';
import styles from './Tooltip.css';

function Tooltip(props) {
  return (
    <div className={props.show ? styles.wrapper : styles.hide}>
      {props.text}
    </div>
  );
}

export default Tooltip;
