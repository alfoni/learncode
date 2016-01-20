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

const Intro = {
  title: 'Landingsside intro',
  type: 'course',
  finishedPercent: '0%',
  disabled: false,
  id: 0,
  assignmentPoints: [6453, 12835]
};
const Stylesheet = {
  title: 'Stylesheet',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  id: 1,
  assignmentPoints: [6453]
};
const Overskrifter = {
  title: 'Overskrifter',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  id: 2,
  assignmentPoints: []
};
const ElementSelector = {
  title: 'CSS Element Selector',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  id: 3,
  assignmentPoints: []
};
const Color = {
  title: 'Farge på tekst',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  id: 4,
  assignmentPoints: []
};
const Bilde = {
  title: 'Bilde',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  id: 5,
  assignmentPoints: []
};
const Landingsside1 = {
  title: 'Landingsside 1',
  type: 'course',
  finishedPercent: '0%',
  disabled: false,
  id: 6,
  assignmentPoints: []
};
const Landingsside2 = {
  title: 'Landingsside 2',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  id: 7,
  assignmentPoints: []
};
const Tekst = {
  title: 'Tekst',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  id: 8,
  assignmentPoints: []
};
const Landingsside3 = {
  title: 'Landingsside 3',
  type: 'course',
  finishedPercent: '0%',
  disabled: false,
  id: 9,
  assignmentPoints: []
};
const Gradient = {
  title: 'Gradient',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  id: 10,
  assignmentPoints: []
};
const Landingsside4 = {
  title: 'Landingsside 4',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  id: 11,
  assignmentPoints: []
};

export default () => {
  return (module) => {
    module.state({
      tiers: [],
      selectedTierIndex: null,
      selectedCourse: null,
      newTierName: '',
      showAddNewTierInput: false,
      courseDependencyMap: [],
      courses: [
        Intro,
        Stylesheet,
        Overskrifter,
        ElementSelector,
        Color,
        Bilde,
        Landingsside1,
        Landingsside2,
        Tekst,
        Landingsside3,
        Gradient,
        Landingsside4
      ]
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
      unlinkCourseClicked
    });
  };
};
