import stopRecording from './../actions/stopRecording.js';
import stopPlaying from './../actions/stopPlaying.js';
import condition from 'common/factories/actions/condition.js';

export default [
  condition(['recorder', 'isPlaying']), {
    true: [stopPlaying],
    false: [stopRecording]
  }
];
