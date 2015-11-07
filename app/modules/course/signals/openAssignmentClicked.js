import trackData from 'common/factories/actions/trackData.js';
import set from 'common/factories/actions/set.js';
import closeAllPopovers from '../actions/closeAllPopovers.js';

export default [
  closeAllPopovers,
  set(['course', 'showAssignment'], true),
  [
    trackData('Opened assignments')
  ]
];
