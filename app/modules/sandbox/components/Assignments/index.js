import React from 'react';
import styles from './styles.css';
import DescriptionToolTip from 'modules/course/components/DescriptionToolTip';

function createAssignmentList(assignments, assignment) {
  const lastAssignment = assignments[assignments.length - 1];

  if (assignment === '') {
    assignments.push([]);

    return assignments;
  }

  lastAssignment.push(assignment);

  return assignments;
}

function renderAssignment(descriptions, index) {
  const text = descriptions.join(' ');

  return (
    <div className={styles.assignmentItem} key={index}>
      <div className={styles.assignmentNumber}>{'0' + (index + 1)}</div>
      <div className={styles.assignmentText}>
        <DescriptionToolTip>
          {text}
        </DescriptionToolTip>
      </div>
    </div>
  );
}

function Assignments(props) {
  const courses = props.tierCourses.map((course, courseIndex) => {
    const scenes = course.scenes.map((scene, sceneIndex) => {
      const assignments = scene.assignments.map((assignment) => {
        return assignment.description.split('\n').reduce(createAssignmentList, [[]]).map(renderAssignment);
      });

      return (
        <div key={sceneIndex}>
          <div className={styles.sceneName}>{scene.name}</div>
          {assignments}
        </div>
      );
    });

    return (
      <div className={styles.wrapper} key={courseIndex}>
        <div className={styles.courseName}>{course.name}</div>
        <div className={styles.description}>
          {scenes}
        </div>
      </div>
    );
  });

  return (
    <div className={styles.mainWrapper}>
      {courses}
    </div>
  );
}

export default Assignments;
