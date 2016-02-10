import setPage from 'common/factories/actions/setPage';
import set from 'common/factories/actions/set';
import getMainAssignment from '../actions/getMainAssignment';
import setDefaultCourseState from 'modules/course/actions/setDefaultCourseState';
import setMainAssignment from '../actions/setMainAssignment';
import showSnackbar from 'common/factories/actions/showSnackbar';
import saveSandboxChain from 'modules/course/chains/saveSandbox';
import setLoadingCourse from 'modules/course/actions/setLoadingCourse';
import setLoadedCourse from 'modules/course/actions/setLoadedCourse';
import getTechTreeData from 'modules/techTree/chains/getTechTreeData';
import setAssignmentsPositions from 'modules/course/actions/setAssignmentsPositions';
import addonsSet from 'cerebral-addons/set';
import loadDescriptions from 'modules/course/actions/loadDescriptions';
import setDescriptions from '../actions/setDescriptions';
import resetAssignment from 'modules/course/actions/resetAssignment';
import setMainAssignmentAsCourse from '../actions/setMainAssignmentAsCourse';
import mainAssignmentIsLoaded from '../actions/mainAssignmentIsLoaded';
import setPreviewState from '../actions/setPreviewState';

export default [
  setPage('mainAssignment'),
  resetAssignment,
  mainAssignmentIsLoaded, {
    true: [
      setPreviewState,
      ...saveSandboxChain
    ],
    false: [
      setDefaultCourseState,
      setLoadingCourse,
      set(['course', 'isLoading'], true),
      [
        getMainAssignment, {
          success: [
            setMainAssignment,
            setMainAssignmentAsCourse,
            setAssignmentsPositions,
            setPreviewState,
            addonsSet('state://./currentAssignmentIndex', 0),
            ...saveSandboxChain,
            setLoadedCourse,
            set(['course', 'isLoading'], false)
          ],
          error: [
            showSnackbar('Innlasting av sandkasse feilet!')
          ]
        }
      ],
      [
        loadDescriptions, {
          success: [setDescriptions],
          error: [showSnackbar('Innlasting av beskrivelser feilet!')]
        }
      ],
      ...getTechTreeData,
      set(['techTree', 'opened'], false)
    ]
  }
];
