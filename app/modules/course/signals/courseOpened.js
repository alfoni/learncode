import setPage from 'common/factories/setPage.js';
import showLoadingCourse from './../actions/showLoadingCourse.js';
import loadCourse from './../actions/loadCourse.js';
import loadScene from './../actions/loadScene.js';
import setCourse from './../actions/setCourse.js';
import hideLoadingCourse from './../actions/hideLoadingCourse.js';

export default [
  setPage('course'),
  showLoadingCourse,
  [
    loadCourse,
    loadScene
  ],
  setCourse, {
    success: [hideLoadingCourse],
    error: []
  }
];
