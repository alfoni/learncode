import Controller from 'cerebral';
import Model from 'cerebral-baobab';
import ajax from './services/ajax.js';

const model = Model({
  currentPage: 'course',
  snackbar: {
    show: false,
    text: '',
    persist: false
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
  recorder: {
    isPlaying: false,
    isUploading: false,
    hasUpload: false,
    isRecording: false,
    hasRecorded: false
  },
  course: {
    name: 'Course 1',
    isLoading: false,
    isLoadingMedia: false,
    isBuffering: false,
    authorId: null,
    currentSeek: [0, Date.now()],
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
    newFileName: '',
    codeSelection: {
      anchor: {ch: 0, line: 0},
      head: {ch: 0, line: 0}
    },
    scenes: []
  },
  user: {
    isLoggedIn: false,
    isLoading: false,
    isAdmin: false
  },
  log: {
    isLoading: false,
    users: []
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
