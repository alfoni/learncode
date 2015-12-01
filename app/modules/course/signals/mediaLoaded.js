import setCurrentSeek from '../actions/setCurrentSeek';

function mediaLoaded(input, state) {
  state.merge(['snackbar'], {
    text: 'Video og lyd lastet!',
    show: true,
    persist: false
  });
  state.set(['course', 'isLoadingMedia'], false);
}

export default [
  mediaLoaded,
  setCurrentSeek
];
