import Controller from 'cerebral';
import Model from 'cerebral-baobab';
import ajax from './services/ajax.js';

const model = Model({
  currentPage: 'course',
  snackbar: {
    show: false,
    text: ''
  },
  home: {
    showSigningupLoader: false,
    hasRegistered: false
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
    showFolder: false,
    showAddFileInput: false,
    currentSceneIndex: 0,
    sandboxSnapshot: null,
    recorder: {
      isPlaying: false,
      isUploading: false,
      isRecording: false,
      hasRecorded: false
    },
    scenes: [/* {
      assignment: {
        description: '',
        code: ''
      },
      currentFileIndex: 0,
      files: [],
      sandboxFiles: [],
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
