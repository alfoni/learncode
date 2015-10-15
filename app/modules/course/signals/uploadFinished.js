import set from 'common/factories/actions/set.js';
import showSnackbar from 'common/factories/actions/showSnackbar.js';
import hideSnackbar from 'common/factories/chains/hideSnackbar.js';

export default [
  set(['course', 'recording', 'isUploading'], false),
  set(['course', 'recording', 'hasRecorded'], false),
  showSnackbar('The upload was successfull!'),
  ...hideSnackbar(2000)
];
