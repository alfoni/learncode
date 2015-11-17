import pausePlaying from '../actions/pausePlaying.js';
import canPause from '../actions/canPause.js';
import setLastPaused from '../actions/setLastPaused.js';

export default [
  canPause, {
    true: [
      pausePlaying,
      setLastPaused
    ],
    false: [
      setLastPaused
    ]
  }
];
