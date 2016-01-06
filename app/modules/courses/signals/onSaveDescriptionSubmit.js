import set from 'common/factories/actions/set';
import createDescription from '../actions/createDescription';
import showSnackbar from 'common/factories/actions/showSnackbar.js';
import loadDescriptions from '../actions/loadDescriptions';
import setDescriptions from '../actions/setDescriptions';
import resetNewDescriptionFields from '../actions/resetNewDescriptionFields';
import checkDescriptionState from '../actions/checkDescriptionState';
import updateDescription from '../actions/updateDescription';

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
  [
    loadDescriptions, {
      success: [
        setDescriptions,
        resetNewDescriptionFields,
        set(['courses', 'isSavingDescription'], false),
        showSnackbar('Beskrivelsen er lagret')
      ],
      error: [
        showSnackbar('Lasting av beskrivelser feilet!')
      ]
    }
  ]
];
