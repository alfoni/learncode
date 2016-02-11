import set from 'common/factories/actions/set';
import createDescription from '../actions/createDescription';
import showSnackbar from 'common/factories/actions/showSnackbar.js';
import resetNewDescriptionFields from '../actions/resetNewDescriptionFields';
import checkDescriptionState from '../actions/checkDescriptionState';
import updateDescription from '../actions/updateDescription';
import getAndSetDescriptions from 'modules/descriptions/chains/getAndSetDescriptions';

export default [
  set(['courses', 'isSavingDescription'], true),
  checkDescriptionState, {
    created: [
      [
        createDescription, {
          success: [],
          error: [showSnackbar('Opprettelse av beskrivelse feilet!')]
        }
      ]
    ],
    updated: [
      [
        updateDescription, {
          success: [],
          error: [showSnackbar('Oppdatering av beskrivelse feilet!')]
        }
      ]
    ]
  },
  ...getAndSetDescriptions,
  resetNewDescriptionFields,
  set(['courses', 'isSavingDescription'], false),
  showSnackbar('Beskrivelsen er lagret')
];
