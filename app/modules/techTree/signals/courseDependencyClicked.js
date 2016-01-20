import addCourseDependency from '../actions/addCourseDependency';
import createDependencySlotTree from '../actions/createDependencySlotTree';
import showSnackbar from 'common/factories/actions/showSnackbar';
import updateTier from '../actions/updateTier';

export default [
  addCourseDependency,
  [
    updateTier, {
      success: [
        createDependencySlotTree
      ],
      error: [
        showSnackbar('Oppdatering av tier feilet!')
      ]
    }
  ]

];
