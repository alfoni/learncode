import setPage from 'common/factories/actions/setPage.js';
import set from 'common/factories/actions/set.js';
import loadCourse from './../actions/loadCourse.js';
import loadScene from './../actions/loadScene.js';
import setCourse from './../actions/setCourse.js';
import setDefaultCourseState from './../actions/setDefaultCourseState.js';
import isSameCourse from './../actions/isSameCourse.js';
import sceneDidLoad from './../actions/sceneDidLoad.js';
import courseAndSceneDidLoad from './../actions/courseAndSceneDidLoad.js';
import setScene from './../actions/setScene.js';
import showSnackbar from 'common/factories/actions/showSnackbar.js';
import saveSandboxChain from './../chains/saveSandbox.js';
import trackData from 'common/factories/actions/trackData.js';
import setLoadingCourse from './../actions/setLoadingCourse';
import setLoadedCourse from './../actions/setLoadedCourse';

export default [
  setPage('course'),
  isSameCourse, {
    true: [
      showSnackbar('Laster scene...'),
      set(['course', 'showScenesList'], false),
      [
        loadScene
      ],
      sceneDidLoad, {
        true: [
          setScene,
          ...saveSandboxChain,
          showSnackbar('Scenen er lastet')
        ],
        false: [
          showSnackbar('Innlasting av scenen feilet!')
        ]
      }
    ],
    false: [
      setDefaultCourseState,
      setLoadingCourse,
      set(['course', 'isLoading'], true),
      [
        loadCourse,
        loadScene
      ],
      courseAndSceneDidLoad, {
        true: [
          setCourse,
          setScene,
          ...saveSandboxChain,
          setLoadedCourse,
          [
            trackData('OPEN_COURSE')
          ]
        ],
        false: [
          showSnackbar('Innlasting av kurset feilet!')
        ]
      }
    ]
  }
];
