import React from 'react';
import styles from './Module.css';

function Module(props) {
  return (
    <div className={props.show ? styles.wrapper : styles.hidden}>
      {
        props.show ?
          props.children
        :
          null
      }
    </div>
  );
}

export default Module;
