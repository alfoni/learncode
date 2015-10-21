import set from 'common/factories/actions/set.js';
import closeAllPopovers from '../actions/closeAllPopovers.js';

export default [
  closeAllPopovers,
  set(['course', 'showFolder'], true)
];
