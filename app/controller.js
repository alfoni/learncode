import Controller from 'cerebral';
import Model from 'cerebral-baobab';
import ajax from './services/ajax.js';
import Router from 'cerebral-router';

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
  course: {
    name: 'Course 1',
    mousePosition: {
      x: 0,
      y: 0
    },
    isLoading: false,
    isLoadingMedia: false,
    isBuffering: false,
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
    newFileName: '',
    codeSelection: {
      anchor: {ch: 0, line: 0},
      head: {ch: 0, line: 0}
    },
    recorder: {
      isPlaying: false,
      isUploading: false,
      hasUpload: false,
      isRecording: false,
      hasRecorded: false
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
  ajax: ajax,
  router: Router,
  getIframePosition() {
    const previewIframe = document.getElementById('previewIframe');

    return {
      offsetLeft: previewIframe.offsetParent.offsetLeft + previewIframe.offsetLeft,
      offsetTop: previewIframe.offsetParent.offsetTop + previewIframe.offsetTop
    };
  }
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
