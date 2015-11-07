import set from 'common/factories/actions/set.js';
import showSnackbar from 'common/factories/actions/showSnackbar.js';

export default [
  set(['course', 'recording', 'isUploading'], false),
  showSnackbar('The upload of audio and video failed!')
];
