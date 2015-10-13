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
    showEditAssignment: false,
    showAssignment: false,
    showConfigureScenes: false,
    currentSceneIndex: 0,
    sandboxSnapshot: null,
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

const computed = {
  currentScene(get) {
    const sceneIndex = get(['course', 'currentSceneIndex']);
    const scenes = get(['course', 'scenes']);

    return scenes[sceneIndex];
  },
  currentFile(get, getComputed) {
    const currentScene = getComputed(['currentScene']);

    return currentScene.sandboxFiles[currentScene.currentFileIndex];
  }
};

export default Controller(model, services, computed);
