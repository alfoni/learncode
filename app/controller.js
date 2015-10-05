import Controller from 'cerebral';
import Model from 'cerebral-baobab';

const model = Model({
  currentPage: 'recording',
  snackbar: {
    show: true,
    text: 'foobar'
  },
  course: {
    isLoading: false,
    showAddFileInput: false,
    currentFileIndex: 0,
    recorder: {
      isPlaying: false,
      started: null
    },
    sandboxFiles: [{
      code: 'foo'
    }],
    showFolder: false
  }
});

export default Controller(model);
