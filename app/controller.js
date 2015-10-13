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
    name: 'Course 1',
    isLoading: false,
    authorId: null,
    showPreview: true,
    showConsole: false,
    showEditAssignment: false,
    showAssignment: false,
    showConfigureScenes: false,
    showScenesList: false,
    currentSceneIndex: 0,
    recorder: {
      isPlaying: false,
      started: null,
      isRecording: false,
      hasRecorded: false
    },
    scenes: [/* {
      assignment: {
        description: '',
        code: ''
      },
      currentFileIndex: 0,
      showAddFileInput: false,
      showScenesList: false,
      files: [],
      sandboxFiles: [],
      showFolder: false
    } */]
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
  currentScene(get) {
    const sceneIndex = get(['course', 'currentSceneIndex']);
    const scenes = get(['course', 'scenes']);

    return scenes[sceneIndex] || 0;
  },
  currentFile(get) {
    const currentSceneIndex = get(['course', 'currentSceneIndex']);
    const currentFileIndex = get(['course', 'scenes', currentSceneIndex, 'currentFileIndex']);
    const files = get(['course', 'scenes', currentSceneIndex, 'sandboxFiles']);

    if (typeof currentFileIndex === 'number' && files.length) {
      return files[currentFileIndex];
    }

    return '';
  }
});

export default controller;
