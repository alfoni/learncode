import removeFile from '../actions/removeFile.js';
import setFileIndex from '../actions/setFileIndex.js';
import showSnackbar from 'common/factories/actions/showSnackbar.js';
import hideSnackbar from 'common/factories/chains/hideSnackbar.js';

export default [
  removeFile,
  setFileIndex,
  showSnackbar('Filen ble slettet'),
  ...hideSnackbar(2000)
];
