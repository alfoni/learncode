import React from 'react';
import styles from './Module.css';

function Module(props) {
  return (
    <div className={props.show ? styles.wrapper : styles.hidden}>
      {props.children}
    </div>
  );
}

export default Module;
