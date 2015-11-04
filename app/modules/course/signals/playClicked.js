import seekRecording from './../actions/seekRecording.js';
import saveSandbox from './../chains/saveSandbox.js';
import playRecording from './../actions/playRecording.js';
import trackData from 'common/factories/chains/trackData.js';

export default [
  ...trackData('Play clicked'),
  seekRecording,
  ...saveSandbox,
  playRecording
];
