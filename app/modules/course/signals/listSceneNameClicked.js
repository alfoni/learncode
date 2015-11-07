import trackData from 'common/factories/actions/trackData.js';
import redirectToScene from '../actions/redirectToScene.js';

export default [
  [
    trackData('Changed scene')
  ],
  redirectToScene
];
