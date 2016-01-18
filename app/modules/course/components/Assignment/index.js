import React from 'react';
import styles from './styles.css';
import DescriptionToolTip from '../DescriptionToolTip';

function Assignment(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.taskHeader}>Oppgave 1</div>
      <div className={styles.description}>
        <DescriptionToolTip>
          {props.assignment.description}
        </DescriptionToolTip>
      </div>
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
