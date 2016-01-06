import setSeek from './../actions/setSeek';
import setCurrentSeek from '../actions/setCurrentSeek.js';
import saveSandbox from '../chains/saveSandbox.js';
import setAssignmentPoints from '../actions/setAssignmentPoints';

export default [
  setSeek,
  setCurrentSeek,
  setAssignmentPoints,
  ...saveSandbox
];
