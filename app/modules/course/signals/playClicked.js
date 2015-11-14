import seekRecording from '../actions/seekRecording.js';
import saveSandbox from '../chains/saveSandbox.js';
import playRecording from '../actions/playRecording.js';
import trackData from 'common/factories/actions/trackData.js';

export default [
  seekRecording,
  ...saveSandbox,
  playRecording,
  [
    trackData('PLAY_CLICKED')
  ]
];
