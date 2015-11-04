import updateCode from './../actions/updateCode.js';
import trackData from 'common/factories/chains/trackData.js';

export default [
  ...trackData('Code changed'),
  updateCode
];
