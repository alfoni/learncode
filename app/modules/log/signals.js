import authenticate from 'common/factories/chains/authenticate';

import logOpened from './signals/logOpened.js';

export default function(controller) {
  controller.signal('log.logOpened', authenticate(logOpened));
}
