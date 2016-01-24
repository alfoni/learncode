import createDependencySlotTree from '../actions/createDependencySlotTree';
import getTiers from '../actions/getTiers';
import setTiers from '../actions/setTiers';
import showSnackbar from 'common/factories/actions/showSnackbar.js';
import getCourses from '../actions/getCourses';
import setCourses from '../actions/setCourses';
import setSelectedTierIndex from '../actions/setSelectedTierIndex';

export default [
  [
    getTiers, {
      success: [
        setTiers,
        setSelectedTierIndex
      ],
      error: [showSnackbar('Innlasting av Tech treet feilet!')]
    },
    getCourses, {
      success: [setCourses],
      error: [showSnackbar('Det oppstod en feil ved henting av kurs!')]
    }
  ],
  createDependencySlotTree,
  showSnackbar('Tech treet er lastet')
];
