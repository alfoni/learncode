import setPage from 'common/factories/actions/setPage';
import set from 'common/factories/actions/set';
import loadCourses from '../actions/loadCourses';
import showSnackbar from 'common/factories/actions/showSnackbar';
import setCourses from '../actions/setCourses';
import loadDescriptions from '../actions/loadDescriptions';
import setDescriptions from '../actions/setDescriptions';

export default [
  setPage('courses'),
  set(['courses', 'isLoading'], true),
  [
    loadCourses, {
      success: [setCourses],
      error: [showSnackbar('Det oppstod en feil ved henting av kurs!')]
    },
    loadDescriptions, {
      success: [setDescriptions],
      error: [showSnackbar('Det oppstod en feil ved henting av beskrivelser!')]
    }
  ],
  set(['courses', 'isLoading'], false)
];
