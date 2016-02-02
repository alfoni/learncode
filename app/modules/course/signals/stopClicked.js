import stopRecording from './../actions/stopRecording';
import setLastPaused from './../actions/setLastPaused';
import setCurrentSeek from '../actions/setCurrentSeek';
import createAssignmentPlaceholders from '../actions/createAssignmentPlaceholders';
import setAssignmentsPositions from './../actions/setAssignmentsPositions';

export default [
  setLastPaused,
  setCurrentSeek,
  stopRecording,
  createAssignmentPlaceholders,
  setAssignmentsPositions
];
