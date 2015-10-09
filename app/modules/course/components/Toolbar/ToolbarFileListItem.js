import React from 'react';
import styles from './ToolbarFileListItem.css';

function ToolbarFileListItem(props) {
  return (
    <div onClick={props.onClick} className={props.currentFile ? styles.activeWrapper : styles.wrapper}>
      <span className={props.icon}></span>
      <span className={styles.fileName}>{props.name}</span>
    </div>
  );
}

export default ToolbarFileListItem;
