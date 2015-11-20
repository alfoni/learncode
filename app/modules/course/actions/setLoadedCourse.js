import currentScene from '../computed/currentScene';

function setLoadedCourse(input, state) {
  state.set(['course', 'isLoading'], false);

  if (Boolean(state.get(currentScene).recording)) {
    state.merge(['snackbar'], {
      text: 'Laster video og lyd...',
      show: true,
      persist: true
    });
    state.set(['course', 'isLoadingMedia'], true);
  } else {
    state.merge(['snackbar'], {
      text: 'Kurset er lastet!',
      show: true,
      persist: false
    });
  }
}

export default setLoadedCourse;
