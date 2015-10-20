import set from 'common/factories/actions/set.js';
import saveCourse from '../actions/saveCourse.js';
import redirectToCourse from '../actions/redirectToCourse.js';
import showSnackbar from 'common/factories/actions/showSnackbar.js';

export default [
  set(['courses', 'isSavingNewCourse'], true),
  [
    saveCourse, {
      success: [redirectToCourse],
      error: [showSnackbar('Kunne ikke lagre kurs')]
    }
  ]
];
