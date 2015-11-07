import saveSandboxChain from '../chains/saveSandbox';
import isPlayingOrRecording from '../actions/isPlayingOrRecording.js';
import showSnackbar from 'common/factories/actions/showSnackbar.js';
import saveScene from '../actions/saveScene.js';
import trackData from 'common/factories/actions/trackData.js';

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
            [
              trackData('SCENE_SAVED')
            ]
          ],
          error: [
            showSnackbar('Det skjedde en feil med lagring av scenen!')
          ]
        }
      ]
    ]
  }
];
