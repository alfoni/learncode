import addNewFile from './../actions/addNewFile.js';
import setActiveFile from './../actions/setActiveFile.js';
import set from 'common/factories/actions/set.js';
import showSnackbar from 'common/factories/actions/showSnackbar.js';
import hideSnackbar from 'common/factories/chains/hideSnackbar.js';

export default [
  addNewFile,
  setActiveFile,
  set(['course', 'showFolder'], false),
  showSnackbar('File created!'),
  ...hideSnackbar(2000)
];
