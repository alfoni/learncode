import opened from './signals/opened';
import courseClicked from './signals/courseClicked';
import courseDependencyClicked from './signals/courseDependencyClicked';
import wrapperClicked from './signals/wrapperClicked';
import authenticate from 'common/factories/chains/authenticate';

const Intro = {
  title: 'Landingsside intro',
  type: 'course',
  finishedPercent: '0%',
  disabled: false,
  id: 0
};
const Stylesheet = {
  title: 'Stylesheet',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  id: 1
};
const Overskrifter = {
  title: 'Overskrifter',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  id: 2
};
const ElementSelector = {
  title: 'CSS Element Selector',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  id: 3
};
const Color = {
  title: 'Farge på tekst',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  id: 4
};
const Bilde = {
  title: 'Bilde',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  id: 5
};
const Landingsside1 = {
  title: 'Landingsside 1',
  type: 'course',
  finishedPercent: '0%',
  disabled: false,
  id: 6
};
const Landingsside2 = {
  title: 'Landingsside 2',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  id: 7
};
const Tekst = {
  title: 'Tekst',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  id: 8
};
const Landingsside3 = {
  title: 'Landingsside 3',
  type: 'course',
  finishedPercent: '0%',
  disabled: false,
  id: 9
};
const Gradient = {
  title: 'Gradient',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  id: 10
};
const Landingsside4 = {
  title: 'Landingsside 4',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  id: 11
};

export default () => {
  return (module) => {
    module.state({
      selectedCourse: null,
      courseDependencyList: [],
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
      wrapperClicked
    });
  };
};
