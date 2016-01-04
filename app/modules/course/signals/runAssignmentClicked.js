import setLoadingAssignment from '../actions/setLoadingAssignment.js';
import saveSandboxChain from '../chains/saveSandbox';

export default [
  setLoadingAssignment,
  ...saveSandboxChain
];
