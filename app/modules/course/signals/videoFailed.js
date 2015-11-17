import pausePlaying from '../actions/pausePlaying';
import showSnackbar from 'common/factories/actions/showSnackbar';

export default [
  pausePlaying,
  showSnackbar('Det oppstod en feil med avspillingen.2 Last siden på nytt.', true)
];
