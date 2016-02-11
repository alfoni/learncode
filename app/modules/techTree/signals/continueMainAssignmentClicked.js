import redirectToMainAssignment from '../actions/redirectToMainAssignment';
import set from 'common/factories/actions/set';
import setMainAssignmentAsCourse from 'modules/mainAssignment/actions/setMainAssignmentAsCourse';

export default [
  setMainAssignmentAsCourse,
  set(['techTree', 'opened'], false),
  set(['techTree', 'showMainAssignmentPopup'], false),
  redirectToMainAssignment
];
