import showSigningupLoader from './../actions/showSigningupLoader.js';
import registerSignup from './../actions/registerSignup.js';
import hideSigningupLoader from './../actions/hideSigningupLoader.js';
import showSnackbarMessage from './../actions/showSnackbarMessage.js';
import hideSnackbar from './../actions/hideSnackbar.js';

export default [
  showSigningupLoader,
  showSnackbarMessage,
  [registerSignup],
  hideSnackbar,
  hideSigningupLoader
];
