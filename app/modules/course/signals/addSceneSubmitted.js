import saveNewScene from './../actions/saveNewScene.js';
import addNewScene from './../actions/addNewScene.js';
import setSceneIndex from './../actions/setSceneIndex.js';
import setScene from './../actions/setScene.js';
import set from 'common/factories/actions/set.js';
import hideSnackbar from 'common/factories/chains/hideSnackbar.js';
import showSnackbar from 'common/factories/actions/showSnackbar.js';

export default [
  set(['course', 'showConfigureScenes'], false),
  showSnackbar('Saving scene...'),
  [
    saveNewScene, {
      success: [
        addNewScene,
        setSceneIndex,
        setScene,
        showSnackbar('Scene was saved and loaded')
      ],
      error: [
        showSnackbar('Could not save new scene!')
      ]
    }
  ],
  ...hideSnackbar(2000)
];
