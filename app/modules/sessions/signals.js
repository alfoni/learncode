import authenticate from 'common/factories/chains/authenticate';

import sessionsOpened from './signals/sessionsOpened';
import sessionSelected from './signals/sessionSelected';
import sessionSignalClicked from './signals/sessionSignalClicked';

export default function(controller) {
  controller.signal('sessions.sessionsOpened', authenticate(sessionsOpened));
  controller.signal('sessions.sessionSelected', sessionSelected);
  controller.signal('sessions.sessionSignalClicked', sessionSignalClicked);
}
