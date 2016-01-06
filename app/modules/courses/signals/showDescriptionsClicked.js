import set from 'common/factories/actions/set';
import closeAllPopovers from '../actions/closeAllPopovers';

export default [
  closeAllPopovers,
  set(['courses', 'showDescriptions'], true)
];
