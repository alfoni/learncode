import set from 'common/factories/actions/set';
import login from '../actions/login';
import redirectToLastCourse from '../actions/redirectToLastCourse';

export default [
  set(['home', 'isLoggingIn'], true),
  set(['home', 'loginErrorMessage'], null),
  login, {
    success: [
      redirectToLastCourse
    ],
    error: [
      set(['home', 'loginErrorMessage'], 'Innlogging feilet! Har du tastet riktig e-post og passord?')
    ]
  },
  set(['home', 'isLoggingIn'], false)
];
