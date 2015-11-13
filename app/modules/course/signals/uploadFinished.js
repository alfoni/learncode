import set from 'common/factories/actions/set.js';
import showSnackbar from 'common/factories/actions/showSnackbar.js';
import saveRecording from '../actions/saveRecording.js';

export default [
  showSnackbar('Lagrer opptak...'),
  [
    saveRecording, {
      success: [
        showSnackbar('Opptaket er nå lagret'),
        set(['recorder', 'isUploading'], false),
        set(['recorder', 'hasRecorded'], false)
      ],
      error: [
        showSnackbar('Det oppstod et problem med å lagre opptaket!')
      ]
    }
  ]
];
