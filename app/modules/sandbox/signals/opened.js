import setPage from 'common/factories/actions/setPage';
import set from 'common/factories/actions/set';
import loadSandboxCourse from '../actions/loadSandboxCourse';
import setDefaultCourseState from 'modules/course/actions/setDefaultCourseState';
import setSandboxCourse from '../actions/setSandboxCourse';
import showSnackbar from 'common/factories/actions/showSnackbar';
import saveSandboxChain from 'modules/course/chains/saveSandbox';
import setLoadingCourse from 'modules/course/actions/setLoadingCourse';
import setLoadedCourse from 'modules/course/actions/setLoadedCourse';
import getTechTreeData from 'modules/techTree/chains/getTechTreeData';
import setAssignmentsPositions from 'modules/course/actions/setAssignmentsPositions';
import addonsSet from 'cerebral-addons/set';
import resetAssignment from 'modules/course/actions/resetAssignment';

export default [
  setPage('sandbox'),
  resetAssignment,
  setDefaultCourseState,
  setLoadingCourse,
  set(['course', 'isLoading'], true),
  [
    loadSandboxCourse, {
      success: [
        setSandboxCourse,
        setAssignmentsPositions,
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
  ...getTechTreeData,
  set(['techTree', 'opened'], false)
];
