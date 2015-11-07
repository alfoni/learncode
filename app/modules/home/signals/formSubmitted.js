import set from 'common/factories/actions/set.js';
import registerSignup from './../actions/registerSignup.js';
import showSnackbar from 'common/factories/actions/showSnackbar.js';

export default [
  set(['home', 'showSigningupLoader'], true),
  [
    registerSignup, {
      success: [
        set(['home', 'hasRegistered'], true)
      ],
      error: [
        showSnackbar('Kunne ikke registrere din e-post')
      ]
    }
  ],
  set(['home', 'showSigningupLoader'], false)
];
