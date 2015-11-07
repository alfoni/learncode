import set from 'common/factories/actions/set.js';
import registerSignup from './../actions/registerSignup.js';
import showSnackbar from 'common/factories/actions/showSnackbar.js';
import redirect from 'common/factories/actions/redirect';
import setUser from 'common/actions/setUser';

export default [
  set(['home', 'showSigningupLoader'], true),
  [
    registerSignup, {
      success: [
        setUser,
        redirect('/courses/51549181-0839-437e-9813-4f1dc4c3b354/scenes/0')
      ],
      error: [
        showSnackbar('Kunne ikke registrere din e-post')
      ]
    }
  ],
  set(['home', 'showSigningupLoader'], false)
];
