import React from 'react';
import styles from './Assignment.css';

function Assignment(props) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.description}>
        {props.assignment.description}
      </p>
      <button
        className={styles.run}
        disabled={props.completed || props.currentAssignmentStatus.isLoading}
        onClick={() => props.onAssignmentRunClick()}>Kjør oppgaven</button>
      <p className={styles.result}>
        {
          props.currentAssignmentStatus.result === true ?
            'Du klarte det! Bra jobba!'
          :
            props.currentAssignmentStatus.result
        }
      </p>
    </div>
  );
}

export default Assignment;
