import setAssignmentResult from '../actions/setAssignmentResult.js';
import isCompletedAssignment from '../actions/isCompletedAssignment.js';
import setCompletedAssignment from '../actions/setCompletedAssignment.js';

export default [
  setAssignmentResult,
  isCompletedAssignment, {
    true: [
      setCompletedAssignment
    ],
    false: []
  }
];
