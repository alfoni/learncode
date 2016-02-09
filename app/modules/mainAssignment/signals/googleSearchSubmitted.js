import openGoogleTab from '../actions/openGoogleTab';
import set from 'common/factories/actions/set';

export default [
  openGoogleTab,
  set(['mainAssignment', 'googleInput'], '')
];
