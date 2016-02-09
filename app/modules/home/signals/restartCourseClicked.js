import resetUserAssignments from '../actions/resetUserAssignments';
import formSubmitted from './formSubmitted';

export default [
  resetUserAssignments,
  ...formSubmitted
];
