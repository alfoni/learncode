import stopRecording from './../actions/stopRecording';
import setLastPaused from './../actions/setLastPaused';
import setCurrentSeek from '../actions/setCurrentSeek';
import createAssignmentPlaceholders from '../actions/createAssignmentPlaceholders';
import setAssignmentsPositions from './../actions/setAssignmentsPositions';
import isAdminMode from '../actions/isAdminMode';

export default [
  setLastPaused,
  setCurrentSeek,
  stopRecording,
  isAdminMode, {
    true: [createAssignmentPlaceholders],
    false: []
  },
  setAssignmentsPositions
];
