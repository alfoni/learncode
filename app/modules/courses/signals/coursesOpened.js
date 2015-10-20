import setPage from 'common/factories/actions/setPage.js';
import set from 'common/factories/actions/set.js';
import loadCourses from '../actions/loadCourses.js';
import showSnackbar from 'common/factories/actions/showSnackbar.js';
import setCourses from '../actions/setCourses.js';

export default [
  setPage('courses'),
  set(['courses', 'isLoading'], true),
  [
    loadCourses, {
      success: [setCourses],
      error: [showSnackbar('Det oppstod en feil ved henting av kurs!')]
    }
  ],
  set(['courses', 'isLoading'], false)
];
