import pausePlaying from '../actions/pausePlaying.js';
import canPause from '../actions/canPause.js';
import setLastPaused from '../actions/setLastPaused.js';
import setCurrentSeek from '../actions/setCurrentSeek';

export default [
  canPause, {
    true: [
      pausePlaying,
      setCurrentSeek,
      setLastPaused
    ],
    false: [
      setCurrentSeek,
      setLastPaused
    ]
  }
];
