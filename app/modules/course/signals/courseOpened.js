import setPage from 'common/factories/setPage.js';
import showLoadingCourse from './../actions/showLoadingCourse.js';
import loadCourse from './../actions/loadCourse.js';
import loadScene from './../actions/loadScene.js';
import setCourse from './../actions/setCourse.js';
import hideLoadingCourse from './../actions/hideLoadingCourse.js';
import setError from './../actions/setError.js';
import setPreviewUrl from './../actions/setPreviewUrl';
import setLoadingPreview from './../actions/setPreviewUrl';
import unsetLoadingPreview from './../actions/setPreviewUrl';
import saveSandbox from './../actions/saveSandbox';

export default [
  setPage('course'),
  showLoadingCourse,
  [
    loadCourse,
    loadScene
  ],
  setCourse, {
    success: [
      hideLoadingCourse,
      setPreviewUrl,
      setLoadingPreview,
      [
        saveSandbox, {
          success: [unsetLoadingPreview],
          error: [setError]
        }
      ]
    ],
    error: [
      setError
    ]
  }
];
