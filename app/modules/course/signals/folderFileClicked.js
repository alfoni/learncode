import trackData from 'common/factories/chains/trackData.js';
import setActiveFile from './../actions/setActiveFile.js';
import set from 'common/factories/actions/set.js';

export default [
  ...trackData('Changed file'),
  setActiveFile,
  set(['course', 'showFolder'], false)
];
