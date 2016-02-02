import opened from './signals/opened.js';
import formSubmitted from './signals/formSubmitted.js';

export default () => {
  return (module) => {
    module.addState({
      showSigningupLoader: false,
      hasRegistered: false
    });

    module.addSignals({
      opened,
      formSubmitted
    });
  };
};
