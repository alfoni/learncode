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
        redirect(
          process.env.NODE_ENV === 'production' ?
            '/courses/8a60babc-4b62-4738-b8b7-ce976addf29d/scenes/0'
          :
            '/courses'
          )
      ],
      error: [
        showSnackbar('Kunne ikke registrere din e-post')
      ]
    }
  ]
];
