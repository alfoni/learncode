import set from 'common/factories/actions/set.js';
import showSnackbar from 'common/factories/actions/showSnackbar.js';
import hideSnackbar from 'common/factories/chains/hideSnackbar.js';

export default [
  set(['course', 'recording', 'isUploading'], false),
  showSnackbar('The upload of audio and video failed!'),
  ...hideSnackbar(2000)
];
