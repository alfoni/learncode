import setPage from 'common/factories/actions/setPage.js';
import set from 'common/factories/actions/set.js';
import loadCourse from './../actions/loadCourse.js';
import loadScene from './../actions/loadScene.js';
import setCourse from './../actions/setCourse.js';
import setDefaultCourseState from './../actions/setDefaultCourseState.js';
import showSnackbar from 'common/factories/actions/showSnackbar.js';
import hideSnackbar from 'common/factories/chains/hideSnackbar.js';
import saveSandboxChain from './../chains/saveSandbox.js';

export default [
  setPage('course'),
  setDefaultCourseState,
  set(['course', 'isLoading'], true),
  showSnackbar('Laster kurs...'),
  [
    loadCourse,
    loadScene
  ],
  setCourse, {
    success: [
      set(['course', 'isLoading'], false),
      ...saveSandboxChain,
      showSnackbar('Kurset er lastet'),
      ...hideSnackbar(1000)
    ],
    error: [
      showSnackbar('Kunne ikke åpne kurset!')
    ]
  }
];
