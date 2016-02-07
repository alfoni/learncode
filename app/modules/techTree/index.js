import authenticate from 'common/factories/chains/authenticate';
import opened from './signals/opened';
import courseClicked from './signals/courseClicked';
import courseDependencyClicked from './signals/courseDependencyClicked';
import wrapperClicked from './signals/wrapperClicked';
import tierClicked from './signals/tierClicked';
import addTierClicked from './signals/addTierClicked';
import addTierAborted from './signals/addTierAborted';
import newTierNameUpdated from './signals/newTierNameUpdated';
import newTierSubmitted from './signals/newTierSubmitted';
import unlinkCourseClicked from './signals/unlinkCourseClicked';
import toggled from './signals/toggled';
import sandboxButtonClicked from './signals/sandboxButtonClicked';

export default () => {
  return (module) => {
    module.addState({
      tiers: [],
      loadedTiers: [],
      opened: false,
      selectedTierIndex: null,
      selectedCourse: null,
      newTierName: '',
      showAddNewTierInput: false,
      courseDependencyMap: [],
      openedCoursePopup: null,
      courses: []
    });

    module.addSignals({
      opened: authenticate(opened),
      courseClicked,
      courseDependencyClicked,
      wrapperClicked,
      tierClicked,
      addTierClicked,
      addTierAborted,
      newTierNameUpdated,
      newTierSubmitted,
      unlinkCourseClicked,
      toggled,
      sandboxButtonClicked
    });
  };
};
