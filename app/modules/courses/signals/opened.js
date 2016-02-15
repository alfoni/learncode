import setPage from 'common/factories/actions/setPage';
import set from 'cerebral-addons/set';
import loadCourses from '../actions/loadCourses';
import showSnackbar from 'common/factories/actions/showSnackbar';
import setCourses from '../actions/setCourses';

export default [
  setPage('courses'),
  set('state:/courses.isLoading', true),
  [
    loadCourses, {
      success: [setCourses],
      error: [showSnackbar('Det oppstod en feil ved henting av kurs!')]
    }
  ],
  set('state:/courses.isLoading', false)
];
