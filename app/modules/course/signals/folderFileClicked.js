import trackData from 'common/factories/actions/trackData.js';
import setActiveFile from './../actions/setActiveFile.js';
import set from 'common/factories/actions/set.js';

export default [
  setActiveFile,
  set(['course', 'showFolder'], false),
  [
    trackData('Changed file')
  ]
];
