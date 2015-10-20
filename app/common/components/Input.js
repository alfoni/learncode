import React from 'react';

import styles from './Input.css';

function ConfigureScenes(props) {
  return (
    <input className={styles.input} onKeyDown={props.onKeyDown} placeholder={props.placeholder}></input>
  );
}

export default ConfigureScenes;
