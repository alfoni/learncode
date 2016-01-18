import addNewFile from './../actions/addNewFile.js';
import setActiveFile from './../actions/setActiveFile.js';
import set from 'common/factories/actions/set.js';
import showSnackbar from 'common/factories/actions/showSnackbar.js';

export default [
  addNewFile,
  setActiveFile,
  set(['course', 'showFolder'], false),
  set(['course', 'newFileName'], ''),
  showSnackbar('File created!')
];
