import React from 'react';

import styles from './AddSceneInput.css';

function ConfigureScenes(props) {
  return (
    <input className={styles.input} onKeyDown={props.onKeyDown} placeholder={props.placeHolder}></input>
  );
}

export default ConfigureScenes;
