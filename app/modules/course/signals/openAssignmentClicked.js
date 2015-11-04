import trackData from 'common/factories/chains/trackData.js';
import set from 'common/factories/actions/set.js';
import closeAllPopovers from '../actions/closeAllPopovers.js';

export default [
  ...trackData('Opened assignments'),
  closeAllPopovers,
  set(['course', 'showAssignment'], true)
];
