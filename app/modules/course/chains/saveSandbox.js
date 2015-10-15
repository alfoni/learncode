import saveSandbox from './../actions/saveSandbox';
import setPreviewUrl from './../actions/setPreviewUrl';
import set from 'common/factories/actions/set.js';
import setSandboxSnapshot from './../actions/setSandboxSnapshot';
import showSnackbar from 'common/factories/actions/showSnackbar.js';

export default [
  setSandboxSnapshot,
  setPreviewUrl,
  set(['course', 'isLoadingPreview'], true),
  [
    saveSandbox, {
      success: [
        set(['course', 'isLoadingPreview'], false)
      ],
      error: [
        showSnackbar('An error occured, please try again...')
      ]
    }
  ]
];
