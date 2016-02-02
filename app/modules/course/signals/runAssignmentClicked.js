import set from 'cerebral-addons/set';
import setLoadingAssignment from '../actions/setLoadingAssignment.js';
import saveSandboxChain from '../chains/saveSandbox';

export default [
  set('state://./currentAssignmentStatus.result', false),
  setLoadingAssignment,
  ...saveSandboxChain
];
