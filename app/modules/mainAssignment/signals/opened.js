import setPage from 'common/factories/actions/setPage';
import getMainAssignment from '../actions/getMainAssignment';
import setDefaultCourseState from 'modules/course/actions/setDefaultCourseState';
import setMainAssignment from '../actions/setMainAssignment';
import showSnackbar from 'common/factories/actions/showSnackbar';
import saveSandboxChain from 'modules/course/chains/saveSandbox';
import setLoadedCourseSnackbar from 'modules/course/actions/setLoadedCourseSnackbar';
import getTechTree from 'modules/techTree/chains/getTechTree';
import setAssignmentsPositions from 'modules/course/actions/setAssignmentsPositions';
import set from 'cerebral-addons/set';
import setMainAssignmentAsCourse from '../actions/setMainAssignmentAsCourse';
import mainAssignmentIsLoaded from '../actions/mainAssignmentIsLoaded';
import setPreviewState from '../actions/setPreviewState';
import getAndSetDescriptions from 'modules/descriptions/chains/getAndSetDescriptions';

export default [
  setPage('mainAssignment'),
  set('state:/course.currentAssignmentStatus.result', false),
  mainAssignmentIsLoaded, {
    true: [
      setPreviewState
    ],
    false: [
      setDefaultCourseState,
      set('state:/course.isLoading', true),
      [
        getMainAssignment, {
          success: [
            setMainAssignment,
            setMainAssignmentAsCourse,
            setAssignmentsPositions,
            setPreviewState,
            set('state:/mainAssignment.currentAssignmentIndex', 0),
            setLoadedCourseSnackbar,
            set('state:/course.isLoading', false)
          ],
          error: [
            showSnackbar('Innlasting av sandkasse feilet!')
          ]
        }
      ],
      ...getAndSetDescriptions,
      ...getTechTree,
      ...saveSandboxChain,
      set('state:/techTree.opened', false)
    ]
  }
];
