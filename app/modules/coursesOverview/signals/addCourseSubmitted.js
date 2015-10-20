import set from 'common/factories/actions/set.js';
import saveCourse from '../actions/saveCourse.js';
import showSnackbar from 'common/factories/actions/showSnackbar.js';

export default [
  set(['coursesOverview', 'showSavingCourse'], true),
  [
    saveCourse, {
      success: [],
      error: [showSnackbar('Kunne ikke lagre kurs')]
    }
  ]
];
