import pausePlaying from '../actions/pausePlaying.js';
import trackData from 'common/factories/chains/trackData.js';

export default [
  ...trackData('Pause clicked'),
  pausePlaying
];
