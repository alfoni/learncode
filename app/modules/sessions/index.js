import authenticate from 'common/factories/chains/authenticate';

import opened from './signals/opened';
import sessionSelected from './signals/sessionSelected';
import sessionSignalClicked from './signals/sessionSignalClicked';

export default () => {
  return (module) => {
    module.state({
      selectedSession: null,
      sessionsList: [],
      openedSignal: null
    });

    module.signals({
      opened: authenticate(opened),
      sessionSelected,
      sessionSignalClicked
    });
  };
};
