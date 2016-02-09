import redirectToMainAssignment from '../actions/redirectToMainAssignment';
import set from 'common/factories/actions/set';

export default [
  redirectToMainAssignment,
  set(['techTree', 'showMainAssignmentPopup'], false)
];
