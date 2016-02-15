import copy from 'cerebral-addons/copy';
import toggle from 'cerebral-addons/toggle';
import closeAllPopovers from '../actions/closeAllPopovers';

export default [
  copy('state://./showScenesList', 'output:/showScenesList'),
  closeAllPopovers,
  toggle('state://./showScenesList')
];
