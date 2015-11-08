import seekRecording from '../actions/seekRecording.js';
import saveSandbox from '../chains/saveSandbox.js';
import playRecording from '../actions/playRecording.js';
import trackData from 'common/factories/actions/trackData.js';
import setCurrentTime from '../actions/setCurrentTime.js';

export default [
  seekRecording,
  ...saveSandbox,
  setCurrentTime,
  playRecording,
  [
    trackData('PLAY_CLICKED')
  ]
];
