import saveSandbox from './../actions/saveSandbox';
import setError from './../actions/setError.js';
import setPreviewUrl from './../actions/setPreviewUrl';
import setLoadingPreview from './../actions/setPreviewUrl';
import unsetLoadingPreview from './../actions/setPreviewUrl';
import setSandboxSnapshot from './../actions/setSandboxSnapshot';

export default [
  setSandboxSnapshot,
  setPreviewUrl,
  setLoadingPreview,
  [
    saveSandbox, {
      success: [unsetLoadingPreview],
      error: [setError]
    }
  ]
];
