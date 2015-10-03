import React from 'react';
import styles from './Toolbar.css';

function Toolbar(props) {
  return (
    <div className={styles.background}>
      {props.children}
    </div>
  );
}

export default Toolbar;
