import toggleForceUser from '../actions/toggleForceUser';
import condition from 'common/factories/actions/condition';
import setInput from 'common/factories/actions/setInput';
import setCurrentSeek from '../actions/setCurrentSeek';
import setSeek from '../actions/setSeek';

export default [
  toggleForceUser,
  condition(['user', 'forceUser']), {
    true: [],
    false: [
      setInput('seek', 0),
      setCurrentSeek,
      setSeek
    ]
  }
];
