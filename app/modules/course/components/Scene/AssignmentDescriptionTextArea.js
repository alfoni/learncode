import React from 'react';
import styles from './AssignmentDescriptionTextArea.css';

function AssignmentDescription(props) {
  return (
    <textArea value={props.value} className={styles.textArea} onChange={props.onChange}></textArea>
  );
}

export default AssignmentDescription;
