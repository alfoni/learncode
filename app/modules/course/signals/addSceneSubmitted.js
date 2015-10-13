import saveNewScene from './../actions/saveNewScene.js';
import addNewScene from './../actions/addNewScene.js';
import setSceneIndex from './../actions/setSceneIndex.js';
import showSavingScene from './../actions/showSavingScene.js';
import timeout from 'common/actions/timeout.js';
import closeConfigureScenes from './../actions/closeConfigureScenes.js';
import hideSnackbar from './../actions/hideSnackbar.js';
import showSceneLoaded from './../actions/showSceneLoaded.js';

export default [
  closeConfigureScenes,
  showSavingScene,
  [
    saveNewScene, {
      success: [
        addNewScene,
        setSceneIndex,
        showSceneLoaded
      ]
    }
  ],
  [
    timeout, {
      success: [hideSnackbar]
    }
  ]
];
