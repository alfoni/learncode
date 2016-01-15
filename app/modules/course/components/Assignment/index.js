import React from 'react';
import styles from './styles.css';
import DescriptionTooltip from '../DescriptionTooltip';

function Assignment(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.description}>
        <DescriptionTooltip>{props.assignment.description}</DescriptionTooltip>
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
