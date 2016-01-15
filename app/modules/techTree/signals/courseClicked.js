import hasSelectedCourse from '../actions/hasSelectedCourse';
import setSelectedCourse from '../actions/setSelectedCourse';
import linkCourses from '../actions/linkCourses';
import createDependencySlotTree from '../actions/createDependencySlotTree';

export default [
  hasSelectedCourse, {
    true: [linkCourses, createDependencySlotTree],
    false: [setSelectedCourse]
  }
];
