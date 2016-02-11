import setPage from 'common/factories/actions/setPage';
import set from 'common/factories/actions/set';
import loadCourses from '../actions/loadCourses';
import showSnackbar from 'common/factories/actions/showSnackbar';
import setCourses from '../actions/setCourses';

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
