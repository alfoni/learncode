import saveSandboxChain from '../chains/saveSandbox';
import isPlayingRecordingOrNotAuthor from '../actions/isPlayingRecordingOrNotAuthor.js';
import showSnackbar from 'common/factories/actions/showSnackbar.js';
import saveScene from '../actions/saveScene.js';

export default [
  isPlayingRecordingOrNotAuthor, {
    true: [
      ...saveSandboxChain
    ],
    false: [
      ...saveSandboxChain,
      [
        saveScene, {
          success: [
            showSnackbar('Scenen er lagret')
          ],
          error: [
            showSnackbar('Det skjedde en feil med lagring av scenen!')
          ]
        }
      ]
    ]
  }
];
