import closeAllPopovers from '../actions/closeAllPopovers';
import setMousePosition from '../actions/setMousePosition';
import showSnackbar from 'common/factories/actions/showSnackbar';
import isPlayingRecording from '../actions/isPlayingRecording';

export default [
  isPlayingRecording, {
    true: [
      showSnackbar('Du må sette kurset på pause for å få kontroll')
    ],
    false: [
      closeAllPopovers,
      setMousePosition
    ]
  }
];
