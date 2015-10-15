import saveNewScene from './../actions/saveNewScene.js';
import addNewScene from './../actions/addNewScene.js';
import setScene from './../actions/setScene.js';
import closeConfigureScenes from './../actions/closeConfigureScenes.js';
import hideSnackbar from '.common/factories/chains/hideSnackbar.js';
import showSnackbar from 'common/factories/actions/showSnackbar.js';

export default [
  closeConfigureScenes,
  showSnackbar('Saving scene...'),
  [
    saveNewScene, {
      success: [
        addNewScene,
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
