import set from 'common/factories/actions/set.js';
import showSnackbar from 'common/factories/actions/showSnackbar.js';

export default [
  set(['course', 'recording', 'isUploading'], true),
  showSnackbar('Lagrer video og lyd...', true)
];
