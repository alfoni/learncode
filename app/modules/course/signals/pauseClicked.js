import pausePlaying from '../actions/pausePlaying.js';
import trackData from 'common/factories/actions/trackData.js';

export default [
  pausePlaying,
  [
    trackData('PAUSE_CLICKED')
  ]
];
