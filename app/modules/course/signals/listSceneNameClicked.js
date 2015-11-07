import trackData from 'common/factories/actions/trackData.js';
import redirectToScene from '../actions/redirectToScene.js';

export default [
  [
    trackData('SCENE_CHANGE')
  ],
  redirectToScene
];
