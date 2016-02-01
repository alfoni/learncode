import copy from 'cerebral-addons/copy';
import setShowScenesList from '../actions/setShowScenesList';
import closeAllPopovers from '../actions/closeAllPopovers';

export default [
  copy('state://./showScenesList', 'output:/showScenesList'),
  closeAllPopovers,
  setShowScenesList
];
