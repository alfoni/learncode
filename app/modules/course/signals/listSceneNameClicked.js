import trackData from 'common/factories/chains/trackData.js';
import redirectToScene from '../actions/redirectToScene.js';

export default [
  ...trackData('Changed scene'),
  redirectToScene
];
