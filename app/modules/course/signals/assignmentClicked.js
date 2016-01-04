import setAssignment from '../actions/setAssignment';
import set from 'common/factories/actions/set';

export default [
  setAssignment,
  set(['course', 'currentAssignmentStatus', 'result'], null)
];
