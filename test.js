'use strict';

const Intro = {
  title: 'Landingsside intro',
  type: 'course',
  finishedPercent: '0%',
  disabled: false,
  color: '#e57373' // Lys rød
};
const Stylesheet = {
  title: 'Stylesheet',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  color: '#E91E63' // Rosa
};
const Overskrifter = {
  title: 'Overskrifter',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  color: '#9C27B0' // Rosa
};
const ElementSelector = {
  title: 'CSS Element Selector',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  color: '#FFEB3B'
};
const Color = {
  title: 'Farge på tekst',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  color: '#3F51B5'
};
const Bilde = {
  title: 'Bilde',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  color: '#90CAF9'
};
const Landingsside1 = {
  title: 'Landingsside 1',
  type: 'course',
  finishedPercent: '0%',
  disabled: false,
  color: '#03A9F4'
};
const Landingsside2 = {
  title: 'Landingsside 2',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  color: '#FFCC80'
};
const Landingsside3 = {
  title: 'Landingsside 3',
  type: 'course',
  finishedPercent: '0%',
  disabled: false,
  color: '#009688'
};
const Tekst = {
  title: 'Tekst',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  color: '#FFF'
};
const Gradient = {
  title: 'Tekst',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  color: '#000'
};

const dependencyList = [{
  course: Gradient,
  deps: [Color],
  dependentBy: []
}, {
  course: Intro,
  deps: [],
  dependentBy: [Bilde, Stylesheet, Overskrifter, ElementSelector, Color]
}, {
  course: Bilde,
  deps: [Intro],
  dependentBy: [Landingsside3, Tekst]
}, {
  course: Stylesheet,
  deps: [Intro],
  dependentBy: [Landingsside1, Landingsside2]
}, {
  course: Overskrifter,
  deps: [Intro],
  dependentBy: [Landingsside1]
}, {
  course: ElementSelector,
  deps: [Intro],
  dependentBy: [Landingsside1]
}, {
  course: Color,
  deps: [Intro],
  dependentBy: [Landingsside1, Gradient]
}, {
  course: Landingsside1,
  deps: [Stylesheet, Overskrifter, ElementSelector, Color],
  dependentBy: [Landingsside3]
}, {
  course: Landingsside2,
  deps: [Stylesheet],
  dependentBy: []
}, {
  course: Landingsside3,
  deps: [Landingsside1, Bilde],
  dependentBy: []
}, {
  course: Tekst,
  deps: [Bilde],
  dependentBy: []
}];

const createLevel = (previousLevel, dependencies) => {
  const newLevel = [];
  dependencies.forEach((course) => {
    previousLevel.forEach((dependency) => {
      if (course.deps.indexOf(dependency.course) >= 0 && newLevel.indexOf(course) < 0
        ) {
        newLevel.push(course);
      }
    });
  });

  newLevel.forEach((course) => {
    newLevel.forEach((dependencyCourse, index) => {
      if (course.dependentBy.indexOf(dependencyCourse.course) >= 0) {
        newLevel.splice(index, 1);
      }
    });
  });

  return newLevel;
};

const createDependencyTree = (dependencyList) => {
  const startPoints = dependencyList.filter((course) => {
    return !course.deps.length;
  });

  const levels = [startPoints];

  // Loop must run until none of the courses in a level has any dependentBy
  while (true) {
    const previousLevel = levels[levels.length - 1];
    let isLastLevel = true;

    previousLevel.forEach((course) => {
      if (course.dependentBy.length > 0) {
        isLastLevel = false;
      }
    });

    if (isLastLevel) {
      break;
    }

    levels.push(createLevel(previousLevel, dependencyList));
  }

  return levels;
};

const sortLevels = (dependencyTree) => {
  const sortedDependencyTree = [];
  dependencyTree.forEach((level, index) => {
    const previousLevel = dependencyTree[index - 1];

    if (previousLevel) {
      level.forEach((course) => {
        const depsIndexes = [];
        previousLevel.forEach((previousLevelCourse, dependencyIndex) => {
          if (course.deps.indexOf(previousLevelCourse.course) >= 0) {
            depsIndexes.push(dependencyIndex);
          }
        });
        course.averageDepsIndex = depsIndexes.reduce((previousValue, currentValue) => {
          return previousValue + currentValue;
        }) / depsIndexes.length;
      });
      level.sort((a, b) => {
        return a.averageDepsIndex - b.averageDepsIndex;
      });
    }
    sortedDependencyTree.push(level);
  });

  return sortedDependencyTree;
};

const createSlots = (levels) => {
  const map = [];
  levels.forEach((level) => {
    const levelMap = [];
    level.forEach((course) => {
      const courseSize = course.course.type === 'course' ? 8 : 4;

      for (let x = 0; x < courseSize; x++) {
        levelMap.push(course);
      }
    });

    for (let x = levelMap.length; x < 20; x++) {
      levelMap.push(null);
    }
    map.push(levelMap);
  });

  return map;
};

const positionSlots = (levels) => {
  const positionedLevels = levels;
  positionedLevels.forEach((level) => {
    const currentLevelSize = level.reduce((previousValue, currentValue) => {
      return currentValue ? previousValue + 1 : previousValue;
    }, 0);
    const maximumSlots = 20;

    for (let x = 0; x < (maximumSlots - currentLevelSize) / 2; x++) {
      level.unshift(null);
      level.splice(level.length - 1, 1);
    }
  });

  return positionedLevels;
};

let data = null;

const expect = require('expect.js');
describe('Tech tree', () => {
  describe('Create dependency tree', () => {
    it('Should return an array', () => {
      expect(createDependencyTree(dependencyList)).to.be.an('array');
    });
    it('Should return an array with four arrays', () => {
      expect(createDependencyTree(dependencyList)).to.have.length(4);
      createDependencyTree(dependencyList).forEach((child) => {
        expect(child).to.be.an('array');
      });
    });
    it('Should return each course/task in the correct array based on their relationships', () => {
      expect(createDependencyTree(dependencyList)).to.eql([
          [dependencyList[1]],
          [dependencyList[2], dependencyList[3], dependencyList[4], dependencyList[5], dependencyList[6]],
          [dependencyList[0], dependencyList[7], dependencyList[8], dependencyList[10]],
          [dependencyList[9]]
      ]);
    });
  });
  describe('Sort levels', () => {
    it('Should sort each level', () => {
      expect(sortLevels(createDependencyTree(dependencyList))).to.eql([
          [dependencyList[1]],
          [dependencyList[2], dependencyList[3], dependencyList[4], dependencyList[5], dependencyList[6]],
          [dependencyList[10], dependencyList[8], dependencyList[7], dependencyList[0]],
          [dependencyList[9]]
      ]);
    });
  });
  describe('Create slots', () => {
    before(() => {
      data = sortLevels(createDependencyTree(dependencyList));
    });
    it('Should return the same number of arrays as it received', () => {
      expect(createSlots(data).length).to.equal(4);
    });
    it('Should return each array with a length of 20', () => {
      createSlots(data).forEach((array) => {
        expect(array).to.have.length(20);
      });
    });
    it('Should create 4 objects if course type is task', () => {
      const testData = {course: {type: 'task'}, deps: [], dependentBy: []};
      createSlots([[testData]])[0].forEach((object, index) => {
        if (index < 4) {
          expect(object).to.eql(testData);
        } else {
          expect(object).to.eql(null);
        }
      });
    });
    it('Should create 8 objects if the course type is course', () => {
      const testData = {course: {type: 'course'}, deps: [], dependentBy: []};
      createSlots([[testData]])[0].forEach((object, index) => {
        if (index < 8) {
          expect(object).to.eql(testData);
        } else {
          expect(object).to.eql(null);
        }
      });
    });
  });
  describe('Position slots', () => {
    before(() => {
      data = [[{'course': {'title': 'Landingsside intro', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#e57373'}, 'deps': [], 'dependentBy': [{'title': 'Bilde', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#90CAF9'}, {'title': 'Stylesheet', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#E91E63'}, {'title': 'Overskrifter', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#9C27B0'}, {'title': 'CSS Element Selector', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFEB3B'}, {'title': 'Farge på tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#3F51B5'}]}, {'course': {'title': 'Landingsside intro', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#e57373'}, 'deps': [], 'dependentBy': [{'title': 'Bilde', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#90CAF9'}, {'title': 'Stylesheet', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#E91E63'}, {'title': 'Overskrifter', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#9C27B0'}, {'title': 'CSS Element Selector', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFEB3B'}, {'title': 'Farge på tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#3F51B5'}]}, {'course': {'title': 'Landingsside intro', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#e57373'}, 'deps': [], 'dependentBy': [{'title': 'Bilde', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#90CAF9'}, {'title': 'Stylesheet', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#E91E63'}, {'title': 'Overskrifter', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#9C27B0'}, {'title': 'CSS Element Selector', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFEB3B'}, {'title': 'Farge på tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#3F51B5'}]}, {'course': {'title': 'Landingsside intro', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#e57373'}, 'deps': [], 'dependentBy': [{'title': 'Bilde', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#90CAF9'}, {'title': 'Stylesheet', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#E91E63'}, {'title': 'Overskrifter', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#9C27B0'}, {'title': 'CSS Element Selector', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFEB3B'}, {'title': 'Farge på tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#3F51B5'}]}, {'course': {'title': 'Landingsside intro', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#e57373'}, 'deps': [], 'dependentBy': [{'title': 'Bilde', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#90CAF9'}, {'title': 'Stylesheet', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#E91E63'}, {'title': 'Overskrifter', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#9C27B0'}, {'title': 'CSS Element Selector', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFEB3B'}, {'title': 'Farge på tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#3F51B5'}]}, {'course': {'title': 'Landingsside intro', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#e57373'}, 'deps': [], 'dependentBy': [{'title': 'Bilde', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#90CAF9'}, {'title': 'Stylesheet', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#E91E63'}, {'title': 'Overskrifter', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#9C27B0'}, {'title': 'CSS Element Selector', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFEB3B'}, {'title': 'Farge på tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#3F51B5'}]}, {'course': {'title': 'Landingsside intro', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#e57373'}, 'deps': [], 'dependentBy': [{'title': 'Bilde', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#90CAF9'}, {'title': 'Stylesheet', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#E91E63'}, {'title': 'Overskrifter', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#9C27B0'}, {'title': 'CSS Element Selector', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFEB3B'}, {'title': 'Farge på tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#3F51B5'}]}, {'course': {'title': 'Landingsside intro', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#e57373'}, 'deps': [], 'dependentBy': [{'title': 'Bilde', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#90CAF9'}, {'title': 'Stylesheet', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#E91E63'}, {'title': 'Overskrifter', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#9C27B0'}, {'title': 'CSS Element Selector', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFEB3B'}, {'title': 'Farge på tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#3F51B5'}]}, null, null, null, null, null, null, null, null, null, null, null, null], [{'course': {'title': 'Bilde', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#90CAF9'}, 'deps': [{'title': 'Landingsside intro', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#e57373'}], 'dependentBy': [{'title': 'Landingsside 3', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#009688'}, {'title': 'Tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFF'}], 'averageDepsIndex': 0}, {'course': {'title': 'Bilde', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#90CAF9'}, 'deps': [{'title': 'Landingsside intro', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#e57373'}], 'dependentBy': [{'title': 'Landingsside 3', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#009688'}, {'title': 'Tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFF'}], 'averageDepsIndex': 0}, {'course': {'title': 'Bilde', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#90CAF9'}, 'deps': [{'title': 'Landingsside intro', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#e57373'}], 'dependentBy': [{'title': 'Landingsside 3', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#009688'}, {'title': 'Tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFF'}], 'averageDepsIndex': 0}, {'course': {'title': 'Bilde', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#90CAF9'}, 'deps': [{'title': 'Landingsside intro', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#e57373'}], 'dependentBy': [{'title': 'Landingsside 3', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#009688'}, {'title': 'Tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFF'}], 'averageDepsIndex': 0}, {'course': {'title': 'Stylesheet', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#E91E63'}, 'deps': [{'title': 'Landingsside intro', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#e57373'}], 'dependentBy': [{'title': 'Landingsside 1', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#03A9F4'}, {'title': 'Landingsside 2', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFCC80'}], 'averageDepsIndex': 0}, {'course': {'title': 'Stylesheet', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#E91E63'}, 'deps': [{'title': 'Landingsside intro', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#e57373'}], 'dependentBy': [{'title': 'Landingsside 1', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#03A9F4'}, {'title': 'Landingsside 2', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFCC80'}], 'averageDepsIndex': 0}, {'course': {'title': 'Stylesheet', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#E91E63'}, 'deps': [{'title': 'Landingsside intro', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#e57373'}], 'dependentBy': [{'title': 'Landingsside 1', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#03A9F4'}, {'title': 'Landingsside 2', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFCC80'}], 'averageDepsIndex': 0}, {'course': {'title': 'Stylesheet', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#E91E63'}, 'deps': [{'title': 'Landingsside intro', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#e57373'}], 'dependentBy': [{'title': 'Landingsside 1', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#03A9F4'}, {'title': 'Landingsside 2', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFCC80'}], 'averageDepsIndex': 0}, {'course': {'title': 'Overskrifter', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#9C27B0'}, 'deps': [{'title': 'Landingsside intro', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#e57373'}], 'dependentBy': [{'title': 'Landingsside 1', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#03A9F4'}], 'averageDepsIndex': 0}, {'course': {'title': 'Overskrifter', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#9C27B0'}, 'deps': [{'title': 'Landingsside intro', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#e57373'}], 'dependentBy': [{'title': 'Landingsside 1', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#03A9F4'}], 'averageDepsIndex': 0}, {'course': {'title': 'Overskrifter', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#9C27B0'}, 'deps': [{'title': 'Landingsside intro', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#e57373'}], 'dependentBy': [{'title': 'Landingsside 1', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#03A9F4'}], 'averageDepsIndex': 0}, {'course': {'title': 'Overskrifter', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#9C27B0'}, 'deps': [{'title': 'Landingsside intro', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#e57373'}], 'dependentBy': [{'title': 'Landingsside 1', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#03A9F4'}], 'averageDepsIndex': 0}, {'course': {'title': 'CSS Element Selector', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFEB3B'}, 'deps': [{'title': 'Landingsside intro', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#e57373'}], 'dependentBy': [{'title': 'Landingsside 1', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#03A9F4'}], 'averageDepsIndex': 0}, {'course': {'title': 'CSS Element Selector', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFEB3B'}, 'deps': [{'title': 'Landingsside intro', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#e57373'}], 'dependentBy': [{'title': 'Landingsside 1', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#03A9F4'}], 'averageDepsIndex': 0}, {'course': {'title': 'CSS Element Selector', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFEB3B'}, 'deps': [{'title': 'Landingsside intro', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#e57373'}], 'dependentBy': [{'title': 'Landingsside 1', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#03A9F4'}], 'averageDepsIndex': 0}, {'course': {'title': 'CSS Element Selector', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFEB3B'}, 'deps': [{'title': 'Landingsside intro', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#e57373'}], 'dependentBy': [{'title': 'Landingsside 1', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#03A9F4'}], 'averageDepsIndex': 0}, {'course': {'title': 'Farge på tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#3F51B5'}, 'deps': [{'title': 'Landingsside intro', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#e57373'}], 'dependentBy': [{'title': 'Landingsside 1', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#03A9F4'}, {'title': 'Tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#000'}], 'averageDepsIndex': 0}, {'course': {'title': 'Farge på tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#3F51B5'}, 'deps': [{'title': 'Landingsside intro', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#e57373'}], 'dependentBy': [{'title': 'Landingsside 1', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#03A9F4'}, {'title': 'Tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#000'}], 'averageDepsIndex': 0}, {'course': {'title': 'Farge på tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#3F51B5'}, 'deps': [{'title': 'Landingsside intro', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#e57373'}], 'dependentBy': [{'title': 'Landingsside 1', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#03A9F4'}, {'title': 'Tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#000'}], 'averageDepsIndex': 0}, {'course': {'title': 'Farge på tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#3F51B5'}, 'deps': [{'title': 'Landingsside intro', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#e57373'}], 'dependentBy': [{'title': 'Landingsside 1', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#03A9F4'}, {'title': 'Tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#000'}], 'averageDepsIndex': 0}], [{'course': {'title': 'Tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFF'}, 'deps': [{'title': 'Bilde', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#90CAF9'}], 'dependentBy': [], 'averageDepsIndex': 0}, {'course': {'title': 'Tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFF'}, 'deps': [{'title': 'Bilde', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#90CAF9'}], 'dependentBy': [], 'averageDepsIndex': 0}, {'course': {'title': 'Tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFF'}, 'deps': [{'title': 'Bilde', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#90CAF9'}], 'dependentBy': [], 'averageDepsIndex': 0}, {'course': {'title': 'Tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFF'}, 'deps': [{'title': 'Bilde', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#90CAF9'}], 'dependentBy': [], 'averageDepsIndex': 0}, {'course': {'title': 'Landingsside 2', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFCC80'}, 'deps': [{'title': 'Stylesheet', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#E91E63'}], 'dependentBy': [], 'averageDepsIndex': 1}, {'course': {'title': 'Landingsside 2', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFCC80'}, 'deps': [{'title': 'Stylesheet', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#E91E63'}], 'dependentBy': [], 'averageDepsIndex': 1}, {'course': {'title': 'Landingsside 2', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFCC80'}, 'deps': [{'title': 'Stylesheet', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#E91E63'}], 'dependentBy': [], 'averageDepsIndex': 1}, {'course': {'title': 'Landingsside 2', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFCC80'}, 'deps': [{'title': 'Stylesheet', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#E91E63'}], 'dependentBy': [], 'averageDepsIndex': 1}, {'course': {'title': 'Landingsside 1', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#03A9F4'}, 'deps': [{'title': 'Stylesheet', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#E91E63'}, {'title': 'Overskrifter', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#9C27B0'}, {'title': 'CSS Element Selector', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFEB3B'}, {'title': 'Farge på tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#3F51B5'}], 'dependentBy': [], 'averageDepsIndex': 2.5}, {'course': {'title': 'Landingsside 1', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#03A9F4'}, 'deps': [{'title': 'Stylesheet', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#E91E63'}, {'title': 'Overskrifter', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#9C27B0'}, {'title': 'CSS Element Selector', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFEB3B'}, {'title': 'Farge på tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#3F51B5'}], 'dependentBy': [], 'averageDepsIndex': 2.5}, {'course': {'title': 'Landingsside 1', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#03A9F4'}, 'deps': [{'title': 'Stylesheet', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#E91E63'}, {'title': 'Overskrifter', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#9C27B0'}, {'title': 'CSS Element Selector', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFEB3B'}, {'title': 'Farge på tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#3F51B5'}], 'dependentBy': [], 'averageDepsIndex': 2.5}, {'course': {'title': 'Landingsside 1', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#03A9F4'}, 'deps': [{'title': 'Stylesheet', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#E91E63'}, {'title': 'Overskrifter', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#9C27B0'}, {'title': 'CSS Element Selector', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFEB3B'}, {'title': 'Farge på tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#3F51B5'}], 'dependentBy': [], 'averageDepsIndex': 2.5}, {'course': {'title': 'Landingsside 1', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#03A9F4'}, 'deps': [{'title': 'Stylesheet', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#E91E63'}, {'title': 'Overskrifter', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#9C27B0'}, {'title': 'CSS Element Selector', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFEB3B'}, {'title': 'Farge på tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#3F51B5'}], 'dependentBy': [], 'averageDepsIndex': 2.5}, {'course': {'title': 'Landingsside 1', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#03A9F4'}, 'deps': [{'title': 'Stylesheet', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#E91E63'}, {'title': 'Overskrifter', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#9C27B0'}, {'title': 'CSS Element Selector', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFEB3B'}, {'title': 'Farge på tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#3F51B5'}], 'dependentBy': [], 'averageDepsIndex': 2.5}, {'course': {'title': 'Landingsside 1', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#03A9F4'}, 'deps': [{'title': 'Stylesheet', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#E91E63'}, {'title': 'Overskrifter', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#9C27B0'}, {'title': 'CSS Element Selector', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFEB3B'}, {'title': 'Farge på tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#3F51B5'}], 'dependentBy': [], 'averageDepsIndex': 2.5}, {'course': {'title': 'Landingsside 1', 'type': 'course', 'finishedPercent': '0%', 'disabled': false, 'color': '#03A9F4'}, 'deps': [{'title': 'Stylesheet', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#E91E63'}, {'title': 'Overskrifter', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#9C27B0'}, {'title': 'CSS Element Selector', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#FFEB3B'}, {'title': 'Farge på tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#3F51B5'}], 'dependentBy': [], 'averageDepsIndex': 2.5}, {'course': {'title': 'Tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#000'}, 'deps': [{'title': 'Farge på tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#3F51B5'}], 'dependentBy': [], 'averageDepsIndex': 4}, {'course': {'title': 'Tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#000'}, 'deps': [{'title': 'Farge på tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#3F51B5'}], 'dependentBy': [], 'averageDepsIndex': 4}, {'course': {'title': 'Tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#000'}, 'deps': [{'title': 'Farge på tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#3F51B5'}], 'dependentBy': [], 'averageDepsIndex': 4}, {'course': {'title': 'Tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#000'}, 'deps': [{'title': 'Farge på tekst', 'type': 'task', 'finishedPercent': '0%', 'disabled': false, 'color': '#3F51B5'}], 'dependentBy': [], 'averageDepsIndex': 4}]];
    });
    it('Should return the same number of arrays as it received', () => {
      expect(positionSlots(data).length).to.equal(3);
    });
    it('Should return each array with a length of 20', () => {
      positionSlots(data).forEach((array) => {
        expect(array).to.have.length(20);
      });
    });
    it('Should position elements in the middle of array', () => {
      expect(positionSlots([[
        {course: {type: 'task'}, deps: [], dependentBy: []},
        {course: {type: 'task'}, deps: [], dependentBy: []},
        {course: {type: 'task'}, deps: [], dependentBy: []},
        {course: {type: 'task'}, deps: [], dependentBy: []},
        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null
      ]])).to.eql([[
        null, null, null, null, null, null, null, null,
        {course: {type: 'task'}, deps: [], dependentBy: []},
        {course: {type: 'task'}, deps: [], dependentBy: []},
        {course: {type: 'task'}, deps: [], dependentBy: []},
        {course: {type: 'task'}, deps: [], dependentBy: []},
        null, null, null, null, null, null, null, null
      ]]);
      expect(positionSlots([[
        {course: {type: 'task'}, deps: [], dependentBy: []},
        {course: {type: 'task'}, deps: [], dependentBy: []},
        {course: {type: 'task'}, deps: [], dependentBy: []},
        {course: {type: 'task'}, deps: [], dependentBy: []},
        {course: {type: 'course'}, deps: [], dependentBy: []},
        {course: {type: 'course'}, deps: [], dependentBy: []},
        {course: {type: 'course'}, deps: [], dependentBy: []},
        {course: {type: 'course'}, deps: [], dependentBy: []},
        {course: {type: 'course'}, deps: [], dependentBy: []},
        {course: {type: 'course'}, deps: [], dependentBy: []},
        {course: {type: 'course'}, deps: [], dependentBy: []},
        {course: {type: 'course'}, deps: [], dependentBy: []},
        null, null, null, null, null, null, null, null
      ]])).to.eql([[
        null, null, null, null,
        {course: {type: 'task'}, deps: [], dependentBy: []},
        {course: {type: 'task'}, deps: [], dependentBy: []},
        {course: {type: 'task'}, deps: [], dependentBy: []},
        {course: {type: 'task'}, deps: [], dependentBy: []},
        {course: {type: 'course'}, deps: [], dependentBy: []},
        {course: {type: 'course'}, deps: [], dependentBy: []},
        {course: {type: 'course'}, deps: [], dependentBy: []},
        {course: {type: 'course'}, deps: [], dependentBy: []},
        {course: {type: 'course'}, deps: [], dependentBy: []},
        {course: {type: 'course'}, deps: [], dependentBy: []},
        {course: {type: 'course'}, deps: [], dependentBy: []},
        {course: {type: 'course'}, deps: [], dependentBy: []},
        null, null, null, null
      ]]);
    });
  });
});
