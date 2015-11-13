import setPage from 'common/factories/actions/setPage.js';
import set from 'common/factories/actions/set.js';
import showSnackbar from 'common/factories/actions/showSnackbar.js';
import loadLogs from '../actions/loadLogs.js';
import setLogs from '../actions/setLogs.js';

export default [
  setPage('log'),
  set(['log', 'isLoading'], true),
  [
    loadLogs, {
      success: [
        setLogs,
        showSnackbar('Logger er lastet')
      ],
      error: [
        showSnackbar('Kunne ikke hente brukerlogger!')
      ]
    }
  ]
];
