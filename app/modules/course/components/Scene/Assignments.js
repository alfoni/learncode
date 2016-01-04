import React from 'react';
import AssignmentsBar from './Assignments/AssignmentsBar';
import styles from './Assignments.css';

function Assignments(props) {
  return (
    <div className={styles.wrapper}>
      <AssignmentsBar assignments={props.assignments} currentIndex={props.currentAssignmentIndex}/>
    </div>
  );
}

export default Assignments;
