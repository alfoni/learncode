import Controller from 'cerebral';
import Model from 'cerebral-baobab';

const model = Model({
  currentPage: 'course',
  snackbar: {
    show: false,
    text: ''
  },
  course: {
    isLoading: false,
    authorId: null,
    currentSceneIndex: null,
    currentScene: Model.monkey({
      cursors: {
        index: ['course', 'currentSceneIndex'],
        scenes: ['course', 'scenes']
      },
      get(data) {
        return data.scenes[data.index];
      }
    }),
    recorder: {
      isPlaying: false,
      started: null,
      isRecording: false
    },
    scenes: [
      {
        showAddFileInput: false,
        currentFileIndex: null,
        currentFileName: '',
        files: [],
        sandboxFiles: [],
        showFolder: false
      }
    ]
  },
  user: {
    id: '123'
  }
});

export default Controller(model);
