import opened from './signals/opened';
import formSubmitted from './signals/formSubmitted';
import startCourseClicked from './signals/startCourseClicked';
import restartCourseClicked from './signals/restartCourseClicked';
import continueCourseClicked from './signals/continueCourseClicked';

export default () => {
  return (module) => {
    module.addState({
      showSigningupLoader: false,
      hasRegistered: false
    });

    module.addSignals({
      opened,
      formSubmitted,
      startCourseClicked,
      restartCourseClicked,
      continueCourseClicked
    });
  };
};
