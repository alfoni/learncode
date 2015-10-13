import React from 'react';
import styles from './EditAssignmentDescription.css';

function AssignmentDescription(props) {
  return (
    <textArea className={styles.textArea} onChange={props.onChange}></textArea>
  );
}

export default AssignmentDescription;
