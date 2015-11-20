import homeOpened from './signals/homeOpened.js';
import formSubmitted from './signals/formSubmitted.js';

export default function(controller) {
  controller.signal('homeOpened', homeOpened);
  controller.signal('home.formSubmitted', formSubmitted);
}
