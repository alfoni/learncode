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
    showPreview: true,
    showConsole: false,
    showEditAssignment: true,
    showAssignment: false,
    currentScene: 0,
    selectedFile: 0,
    recorder: {
      isPlaying: false,
      started: null,
      isRecording: false
    },
    scenes: [{
      assignment: {
        description: '',
        code: ''
      },
      showAddFileInput: false,
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

const controller = Controller(model, services);
controller.compute({
  course: {
    currentScene(get, index) {
      return get(['course', 'scenes', index]);
    },
    selectedFile(get, index) {
      const currentScene = get(['course', 'currentScene']);

      return get(['course', 'scenes', currentScene, 'files', index]);
    }
  }
});

export default controller;
