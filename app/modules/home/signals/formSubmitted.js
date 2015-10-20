import set from 'common/factories/actions/set.js';
import registerSignup from './../actions/registerSignup.js';
import showSnackbar from 'common/factories/actions/showSnackbar.js';
import hideSnackbar from 'common/factories/chains/hideSnackbar.js';

export default [
  set(['home', 'showSigningupLoader'], true),
  [
    registerSignup, {
      success: [
        set(['home', 'hasRegistered'], true)
      ],
      error: [
        showSnackbar('Kunne ikke registrere din e-post'),
        ...hideSnackbar(1000)
      ]
    }
  ],
  set(['home', 'showSigningupLoader'], false)
];
