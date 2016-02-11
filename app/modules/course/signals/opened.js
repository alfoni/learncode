import setPage from 'common/factories/actions/setPage.js';
import addonsSet from 'cerebral-addons/set';
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
import setLoadingCourse from './../actions/setLoadingCourse';
import setLoadedCourse from './../actions/setLoadedCourse';
import setAssignmentsPositions from './../actions/setAssignmentsPositions';
import getAndSetDescriptions from 'modules/descriptions/chains/getAndSetDescriptions';
import getTechTreeData from 'modules/techTree/chains/getTechTreeData';
import resetAssignment from '../actions/resetAssignment';

export default [
  setPage('course'),
  resetAssignment,
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
          setAssignmentsPositions,
          addonsSet('state://./currentAssignmentIndex', -1),
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
          setAssignmentsPositions,
          addonsSet('state://./currentAssignmentIndex', -1),
          ...saveSandboxChain,
          setLoadedCourse,
          set(['course', 'isLoading'], false)
        ],
        false: [
          showSnackbar('Innlasting av kurset feilet!')
        ]
      }
    ]
  },
  ...getAndSetDescriptions,
  ...getTechTreeData,
  set(['techTree', 'opened'], false)
];
