import redirectToMainAssignment from '../actions/redirectToMainAssignment';
import set from 'common/factories/actions/set';
import setMainAssignmentAsCourse from 'modules/mainAssignment/actions/setMainAssignmentAsCourse';
import createMainAssignment from 'modules/mainAssignment/actions/createMainAssignment';
import getMainAssignment from 'modules/mainAssignment/actions/getMainAssignment';

export default [
  [
    createMainAssignment, {
      success: [
        [
          getMainAssignment, {
            success: [
              setMainAssignmentAsCourse,
              set(['techTree', 'showMainAssignmentPopup'], false),
              redirectToMainAssignment
            ],
            error: []
          }
        ]
      ],
      error: []
    }
  ]
];
