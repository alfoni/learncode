import set from 'common/factories/actions/set';
import register from '../actions/register';
import redirect from 'common/factories/actions/redirect';
import setRegisterErrorMessage from '../actions/registerErrorMessage';

export default [
  set(['home', 'isRegistering'], true),
  set(['home', 'registerErrorMessage'], false),
  [
    register, {
      success: [
        redirect(
          process.env.NODE_ENV === 'production' ?
            '/courses/f644e54e-d6d1-44ae-ac97-ac5cea6be209/scenes/0'
          :
            '/courses'
          )
      ],
      error: [
        setRegisterErrorMessage
      ]
    }
  ],
  set(['home', 'isRegistering'], false)
];
