import addNewFile from './../actions/addNewFile.js';
import setActiveFile from './../actions/setActiveFile.js';
import hideAddFileInput from './../actions/hideAddFileInput.js';
import showFileCreatedSnackbar from './../actions/showFileCreatedSnackbar.js';
import hideSnackbar from './../actions/hideSnackbar.js';
import timeout from 'common/actions/timeout.js';

export default [
  addNewFile,
  setActiveFile,
  hideAddFileInput,
  showFileCreatedSnackbar,
  [
    timeout, {
      success: [hideSnackbar]
    }
  ]
];
