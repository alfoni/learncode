import setSelectedCourse from '../actions/setSelectedCourse';
import set from 'cerebral-addons/set';
import closeAllPopovers from 'modules/courses/actions/closeAllPopovers';

export default [
  setSelectedCourse,
  set('state:/techTree.openedCoursePopup', null),
  closeAllPopovers,
  set('state:/techTree.showMainAssignmentPopup', false)
];
