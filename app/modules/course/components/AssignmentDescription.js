import React from 'react';
import style from './AssignmentDescription.css';

function AssignmentDescription(props) {
  return (
    <div className={style.wrapper}>
      <h2>Assignment</h2>
      {props.description}
    </div>
  );
}

export default AssignmentDescription;
