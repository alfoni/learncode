import React from 'react';
import styles from './ModuleFileName.css';

function ModuleFileName(props) {
  return (
    <div className={props.fileName ? styles.fileName : styles.fileNameContracted}>{props.fileName}</div>
  );
}

export default ModuleFileName;
