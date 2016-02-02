import setSeek from './../actions/setSeek';
import setCurrentSeek from '../actions/setCurrentSeek.js';
import saveSandbox from '../chains/saveSandbox.js';
import setCurrentAssignment from '../actions/setCurrentAssignment';

export default [
  setSeek,
  setCurrentSeek,
  setCurrentAssignment,
  ...saveSandbox
];
