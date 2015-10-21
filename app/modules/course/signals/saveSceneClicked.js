import saveSandboxChain from '../chains/saveSandbox';
import isPlayingOrRecording from '../actions/isPlayingOrRecording.js';
import showSnackbar from 'common/factories/actions/showSnackbar.js';
import hideSnackbar from 'common/factories/chains/hideSnackbar.js';
import saveScene from '../actions/saveScene.js';

export default [
  isPlayingOrRecording, {
    true: [
      ...saveSandboxChain
    ],
    false: [
      ...saveSandboxChain,
      [
        saveScene, {
          success: [
            showSnackbar('Scenen er lagret'),
            ...hideSnackbar(2000)
          ],
          error: [
            showSnackbar('Det skjedde en feil med lagring av scenen!')
          ]
        }
      ]
    ]
  }
];
