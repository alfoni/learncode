import setPage from 'common/factories/actions/setPage.js';
import set from 'common/factories/actions/set.js';
import showSnackbar from 'common/factories/actions/showSnackbar.js';
import loadSessions from '../actions/loadSessions.js';
import setSessions from '../actions/setSessions.js';

export default [
  setPage('sessions'),
  set(['sessions', 'isLoading'], true),
  [
    loadSessions, {
      success: [
        setSessions,
        showSnackbar('Logger er lastet')
      ],
      error: [
        showSnackbar('Kunne ikke hente sesjoner!')
      ]
    }
  ]
];
