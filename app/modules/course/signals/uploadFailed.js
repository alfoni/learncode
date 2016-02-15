import set from 'cerebral-addons/set';
import showSnackbar from 'common/factories/actions/showSnackbar.js';

export default [
  set('course.recording.isUploading', false),
  showSnackbar('The upload of audio and video failed!')
];
