import pausePlaying from '../actions/pausePlaying';
import trackData from 'common/factories/actions/trackData';
import set from 'common/factories/actions/set';

export default [
  pausePlaying,
  set(['recorder', 'isBuffering'], true),
  [
    trackData('VIDEO_STARTED_BUFFERING')
  ]
];
