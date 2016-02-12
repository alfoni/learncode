import setPage from 'common/factories/actions/setPage';
import getMainAssignment from '../actions/getMainAssignment';
import setDefaultCourseState from 'modules/course/actions/setDefaultCourseState';
import setMainAssignment from '../actions/setMainAssignment';
import showSnackbar from 'common/factories/actions/showSnackbar';
import saveSandboxChain from 'modules/course/chains/saveSandbox';
import setLoadingCourse from 'modules/course/actions/setLoadingCourse';
import setLoadedCourse from 'modules/course/actions/setLoadedCourse';
import getTechTreeData from 'modules/techTree/chains/getTechTreeData';
import setAssignmentsPositions from 'modules/course/actions/setAssignmentsPositions';
import set from 'cerebral-addons/set';
import resetAssignment from 'modules/course/actions/resetAssignment';
import setMainAssignmentAsCourse from '../actions/setMainAssignmentAsCourse';
import mainAssignmentIsLoaded from '../actions/mainAssignmentIsLoaded';
import setPreviewState from '../actions/setPreviewState';
import getAndSetDescriptions from 'modules/descriptions/chains/getAndSetDescriptions';
import isOnSamePage from '../actions/isOnSamePage';

export default [
  isOnSamePage, {
    true: [
      setPreviewState
    ],
    false: [
      setPage('mainAssignment'),
      resetAssignment,
      mainAssignmentIsLoaded, {
        true: [
          setPreviewState
        ],
        false: [
          setDefaultCourseState,
          setLoadingCourse,
          set('state:/course.isLoading', true),
          [
            getMainAssignment, {
              success: [
                setMainAssignment,
                setMainAssignmentAsCourse,
                setAssignmentsPositions,
                setPreviewState,
                set('state:/mainAssignment.currentAssignmentIndex', 0),
                setLoadedCourse,
                set('state:/course.isLoading', false)
              ],
              error: [
                showSnackbar('Innlasting av sandkasse feilet!')
              ]
            }
          ],
          ...getAndSetDescriptions,
          ...getTechTreeData,
          set('state:/techTree.opened', false)
        ]
      },
      ...saveSandboxChain
    ]
  }
];
