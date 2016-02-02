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

const Intro = {
  title: 'Landingsside intro',
  type: 'course',
  finishedPercent: '0%',
  disabled: false,
  id: 0,
  assignments: [6453, 12835]
};

export default () => {
  return (module) => {
    module.state({
      tiers: [],
      opened: false,
      selectedTierIndex: null,
      selectedCourse: null,
      newTierName: '',
      showAddNewTierInput: false,
      courseDependencyMap: [],
      openedCourse: null,
      courses: []
    });

    module.signals({
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
      toggled
    });
  };
};
