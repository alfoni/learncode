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
    isEnded: false,
    isUploading: false,
    hasUpload: false,
    isRecording: false,
    hasRecorded: false,
    isBuffering: false,
    currentSeek: [0, Date.now()],
    lastPaused: Date.now()
  },
  course: {
    name: 'Course 1',
    mousePosition: {
      x: 0,
      y: 0
    },
    isLoading: false,
    isLoadingMedia: false,
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
    scenes: []
  },
  user: {
    isLoggedIn: false,
    isLoading: false,
    isAdmin: false
  },
  sessions: {
    selectedSession: null,
    sessionsList: [],
    openedSignal: null
  },
  session: {
    sessionId: null
  }
});

const services = {
  ajax: ajax,
  getIframePosition() {
    const previewIframe = document.getElementById('previewIframe');

    return {
      offsetLeft: previewIframe.offsetParent.offsetLeft + previewIframe.offsetLeft,
      offsetTop: previewIframe.offsetParent.offsetTop + previewIframe.offsetTop
    };
  }
};

export default Controller(model, services);
