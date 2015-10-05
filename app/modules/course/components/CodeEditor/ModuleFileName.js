import React from 'react';
import styles from './ModuleFileName.css';

function ModuleFileName(props) {
  return (
    <div className={styles.fileName}>{props.fileName}</div>
  );
}

export default ModuleFileName;
