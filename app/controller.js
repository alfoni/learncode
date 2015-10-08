import Controller from 'cerebral';
import Model from 'cerebral-baobab';
import ajax from './services/ajax.js';

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
    showPreview: true,
    showConsole: false,
    currentScene: Model.monkey({
      cursors: {
        index: ['course', 'currentSceneIndex'],
        scenes: ['course', 'scenes']
      },
      get(data) {
        return data.scenes[data.index];
      }
    }),
    selectedFile: Model.monkey({
      cursors: {
        index: ['course', 'currentScene', 'currentFileIndex'],
        files: ['course', 'currentScene', 'files']
      },
      get(data) {
        if (typeof data.index === 'number' && data.files.length) {
          return data.files[data.index];
        }

        return {};
      }
    }),
    recorder: {
      isPlaying: false,
      started: null,
      isRecording: false
    },
    scenes: [{
      showAddFileInput: false,
      currentFileIndex: null,
      files: [],
      sandboxFiles: [],
      showFolder: false
    }]
  },
  user: {
    id: '123'
  }
});

const services = {
  ajax: ajax
};

export default Controller(model, services);
