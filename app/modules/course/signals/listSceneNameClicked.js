import loadScene from './../actions/loadScene.js';
import setSceneIndex from './../actions/setSceneIndex.js';
import setScene from './../actions/setScene.js';
import timeout from 'common/actions/timeout.js';
import hideSnackbar from './../actions/hideSnackbar.js';
import showLoadingScene from './../actions/showLoadingScene.js';
import showSceneLoaded from './../actions/showSceneLoaded.js';
import closeScenesList from './../actions/closeScenesList.js';

export default [
  showLoadingScene,
  closeScenesList,
  [loadScene],
  showSceneLoaded,
  setScene,
  setSceneIndex,
  [
    timeout, {
      success: [hideSnackbar]
    }
  ]
];
