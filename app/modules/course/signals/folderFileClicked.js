import setActiveFile from './../actions/setActiveFile.js';
import set from 'common/factories/actions/set.js';

export default [
  setActiveFile,
  set(['course', 'showFolder'], false)
];
