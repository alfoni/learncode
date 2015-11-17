import pausePlaying from '../actions/pausePlaying';
import set from 'common/factories/actions/set';

export default [
  pausePlaying,
  set(['recorder', 'isBuffering'], true)
];
