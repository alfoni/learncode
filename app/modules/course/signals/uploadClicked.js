import set from 'common/factories/actions/set.js';
import showSnackbar from 'common/factories/actions/showSnackbar.js';
import hideSnackbar from 'common/factories/chains/hideSnackbar.js';
import saveRecording from './../actions/saveRecording.js';

export default [
  set(['course', 'recording', 'isUploading'], true),
  showSnackbar('Saving recording, video and audio...'),
  [
    saveRecording, {
      success: [
        showSnackbar('Saving video and audio...')
      ],
      error: [
        showSnackbar('Error saving recording')
      ]
    }
  ],
  ...hideSnackbar(2000)
];
