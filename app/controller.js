import Controller from 'cerebral';
import Model from 'cerebral-baobab';

const model = Model({
  currentPage: 'recording',
  course: {
    showAddFileInput: false,
    currentFileIndex: 0,
    currentFileName: 'index.html',
    recorder: {
      isPlaying: false,
      started: null
    },
    sandboxFiles: [{
      code: 'foo'
    }],
    showFilesPopover: false
  }
});

export default Controller(model);
