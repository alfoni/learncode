import setPage from 'common/factories/actions/setPage.js';
import createDependencySlotTree from '../actions/createDependencySlotTree';
import getTiers from '../actions/getTiers';
import setTiers from '../actions/setTiers';
import showSnackbar from 'common/factories/actions/showSnackbar.js';

export default [
  setPage('techTree'),
  [
    getTiers, {
      success: [
        setTiers,
        createDependencySlotTree,
        showSnackbar('Tech treet er lastet')
      ],
      error: [showSnackbar('Innlasting av Tech treet feilet!')]
    }
  ]
];
