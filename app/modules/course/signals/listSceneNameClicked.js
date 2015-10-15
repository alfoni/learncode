import loadScene from './../actions/loadScene.js';
import setSceneIndex from './../actions/setSceneIndex.js';
import setScene from './../actions/setScene.js';
import showLoadingScene from './../actions/showLoadingScene.js';
import showSnackbar from 'common/factories/actions/showSnackbar.js';
import hideSnackbar from 'common/factories/chains/hideSnackbar.js';
import closeScenesList from './../actions/closeScenesList.js';

export default [
  showLoadingScene,
  closeScenesList,
  [loadScene],
  showSnackbar('Scene was loaded'),
  setScene,
  setSceneIndex,
  ...hideSnackbar(2000)
];
