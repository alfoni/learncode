import pausePlaying from '../actions/pausePlaying';
import set from 'common/factories/actions/set';
import showSnackbar from 'common/factories/actions/showSnackbar';

export default [
  pausePlaying,
  set(['recorder', 'isBuffering'], true),
  showSnackbar('Laster video...', true)
];
