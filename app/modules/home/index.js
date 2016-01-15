import opened from './signals/opened.js';
import formSubmitted from './signals/formSubmitted.js';

export default () => {
  return (module) => {
    module.state({
      showSigningupLoader: false,
      hasRegistered: false
    });

    module.signals({
      opened,
      formSubmitted
    });
  };
};
