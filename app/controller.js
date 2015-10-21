import Controller from 'cerebral';
import Model from 'cerebral-baobab';
import ajax from './services/ajax.js';
import Router from 'cerebral-router';

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
  courses: {
    showNewCourse: false,
    isSavingNewCourse: false,
    newCourse: {
      courseName: '',
      sceneName: ''
    },
    courses: []
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
    newSceneName: '',
    recorder: {
      isPlaying: false,
      isUploading: false,
      isRecording: false,
      hasRecorded: false
    },
    scenes: [/* {
      assignment: {
        description: '',
        code: '',
        result: false
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
  ajax: ajax,
  router: Router
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
