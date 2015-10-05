import React from 'react';
import styles from './Module.css';

function Module(props) {
  return (
    <div className={styles.wrapper}>
      {props.children}
    </div>
  );
}

export default Module;
