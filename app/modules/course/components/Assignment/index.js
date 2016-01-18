import React from 'react';
import styles from './styles.css';
import DescriptionToolTip from '../DescriptionToolTip';

function Assignment(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.description}>
        <DescriptionToolTip>{props.assignment.description}</DescriptionToolTip>
      </div>
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
