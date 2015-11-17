import setSeek from './../actions/setSeek';
import setCurrentSeek from '../actions/setCurrentSeek.js';
import saveSandbox from '../chains/saveSandbox.js';

export default [
  setCurrentSeek,
  setSeek,
  ...saveSandbox
];
