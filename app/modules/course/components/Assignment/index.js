import React from 'react';
import styles from './styles.css';
import DescriptionToolTip from '../DescriptionToolTip';
import {Decorator as Cerebral} from 'cerebral-view-react';
import currentAssignment from '../../computed/currentAssignment';

@Cerebral({
  currentAssignment: currentAssignment,
  currentAssignmentIndex: ['course', 'currentAssignmentIndex']
})
class Assignment extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.taskHeader}>Oppgave {this.props.currentAssignmentIndex + 1}</div>
        <div className={styles.description}>
          <DescriptionToolTip>
            {this.props.assignment.description}
          </DescriptionToolTip>
        </div>
      </div>
    );
  }
}

export default Assignment;
