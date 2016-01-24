import setSelectedCourse from '../actions/setSelectedCourse';
import set from 'common/factories/actions/set';
import closeAllPopovers from 'modules/courses/actions/closeAllPopovers';

export default [
  setSelectedCourse,
  set(['techTree', 'openedCourse'], null),
  closeAllPopovers
];
