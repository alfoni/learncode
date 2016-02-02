import set from 'cerebral-addons/set';
import toggleForceUser from '../actions/toggleForceUser';
import condition from 'common/factories/actions/condition';
import setInput from 'common/factories/actions/setInput';
import setCurrentSeek from '../actions/setCurrentSeek';
import setSeek from '../actions/setSeek';

export default [
  toggleForceUser,
  condition(['user', 'forceUser']), {
    true: [
      set('state://./currentAssignmentIndex', 0)
    ],
    false: [
      setInput('seek', 0),
      setCurrentSeek,
      setSeek
    ]
  }
];
