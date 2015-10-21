import set from 'common/factories/actions/set.js';
import saveSandboxChain from '../chains/saveSandbox';

export default [
  ...saveSandboxChain,
  set(['course', 'showAssignment'], true)
];
