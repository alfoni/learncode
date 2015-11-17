import playRecording from '../actions/playRecording';
import showSnackbar from 'common/factories/actions/showSnackbar';
import shouldContinuePlaying from '../actions/shouldContinuePlaying';
import set from 'common/factories/actions/set';

export default [
  showSnackbar('Video lastet!'),
  set(['recorder', 'isBuffering'], false),
  shouldContinuePlaying, {
    true: [
      playRecording
    ],
    false: []
  }
];
