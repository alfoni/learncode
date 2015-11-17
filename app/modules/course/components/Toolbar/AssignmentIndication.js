import React from 'react';
import styles from './AssignmentIndication.css';
import icons from 'common/icons.css';

function AssignmentIndication(props) {
  return (
    <div className={styles.wrapper}>
      {
        props.isRunningAssignment ?
          <div>
            <div className={`${icons.checkbox} ${styles.runningAssignment}`}></div>
            <div className={styles.text}>Kjører oppgave</div>
          </div>
        :
          <div>
            <div className={`${icons.checkbox} ${props.assignmentResult === true ? styles.success : styles.failure}`}></div>
            <div className={styles.text}>
              {props.assignmentResult === true ? 'Oppgaven er løst' : 'Oppgaven er ikke løst'}
            </div>
          </div>
      }
    </div>
  );
}

export default AssignmentIndication;
