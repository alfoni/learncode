import seekRecording from '../actions/seekRecording.js';
import saveSandbox from '../chains/saveSandbox.js';
import playRecording from '../actions/playRecording.js';

export default [
  seekRecording,
  ...saveSandbox,
  playRecording
];
