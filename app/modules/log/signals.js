import logOpened from './signals/logOpened.js';

export default function(controller) {
  controller.signal('log.logOpened', logOpened);
}
