import React from 'react';
import styles from './styles.css';
import DescriptionToolTip from '../DescriptionToolTip';
import {Decorator as Cerebral} from 'cerebral-view-react';
import currentAssignment from '../../computed/currentAssignment';

@Cerebral({
  currentAssignment: currentAssignment,
  currentAssignmentIndex: ['course', 'currentAssignmentIndex'],
  recorder: ['recorder']
})
class Assignment extends React.Component {
  createAssignmentList(assignments, assignment) {
    const lastAssignment = assignments[assignments.length - 1];

    if (assignment === '') {
      assignments.push([]);

      return assignments;
    }

    lastAssignment.push(assignment);

    return assignments;
  }
  renderAssignment(descriptions, index) {
    const text = descriptions.join(' ');

    return (
      <div className={styles.assignmentItem} key={index}>
        <div className={styles.assignmentNumber}>{'0' + (index + 1)}</div>
        <div className={styles.assignmentText}>
          <DescriptionToolTip id={Math.random() * 1000}>
            {text}
          </DescriptionToolTip>
        </div>
      </div>
    );
  }
  renderCompletedText() {
    return (
      <div className={styles.finishedHeader}>
        Fullført
        <div className={styles.finishedSubheader}>Trykk "Fortsett" for å lære mer</div>
      </div>
    );
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.taskHeader}>
          Oppgave {this.props.currentAssignmentIndex + 1}
          {this.props.completed ? <span className={styles.completedText}>fullført</span> : null}
        </div>
        <div className={styles.description}>
          {this.props.assignment.description.split('\n').reduce(this.createAssignmentList, [[]]).map(this.renderAssignment)}
          {this.props.completed && !this.props.recorder.isPlaying ? this.renderCompletedText() : null}
        </div>
      </div>
    );
  }
}

export default Assignment;
