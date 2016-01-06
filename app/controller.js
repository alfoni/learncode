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
    id: null,
    name: 'Course 1',
    mousePosition: {
      x: 0,
      y: 0
    },
    isLoading: false,
    currentAssignmentStatus: {
      isLoading: false,
      result: null
    },
    assignmentPoints: [],
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
    currentAssignmentIndex: 0,
    sandboxSnapshot: null,
    newSceneName: '',
    newFileName: '',
    codeSelection: {
      anchor: {ch: 0, line: 0},
      head: {ch: 0, line: 0}
    },
    scenes: [],
    scenesList: []
  },
  user: {
    isLoggedIn: false,
    isLoading: false,
    isAdmin: false,
    forceUser: false,
    assignmentsSolved: []
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
  },
  localAssignments: {
    get(courseId, sceneId) {
      const assignments = JSON.parse(localStorage.getItem('assignments') || '{}');

      if (assignments[courseId]) {
        return assignments[courseId][sceneId] || [];
      }

      return [];
    },
    set(courseId, sceneId, updatedAssignments) {
      const assignments = JSON.parse(localStorage.getItem('assignments') || '{}');

      assignments[courseId] = assignments[courseId] || {};
      assignments[courseId][sceneId] = updatedAssignments;
      localStorage.setItem('assignments', JSON.stringify(assignments));
    }
  }
};

export default Controller(model, services);
