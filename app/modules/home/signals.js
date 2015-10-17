import formSubmitted from './signals/formSubmitted.js';

export default function(controller) {
  controller.signal('home.formSubmitted', formSubmitted);
}
