import saveSandboxChain from 'modules/course/chains/saveSandbox';
import showSnackbar from 'common/factories/actions/showSnackbar.js';
import saveMainAssignment from '../actions/saveMainAssignment';

export default [
  ...saveSandboxChain,
  [
    saveMainAssignment, {
      success: [
        showSnackbar('Oppgaven er lagret')
      ],
      error: [
        showSnackbar('Det skjedde en feil med lagring av oppgaven!')
      ]
    }
  ]
];
