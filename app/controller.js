import Controller from 'cerebral';
import Model from 'cerebral-baobab';
import ajax from './services/ajax.js';

const Intro = {
  title: 'Landingsside intro',
  type: 'course',
  finishedPercent: '0%',
  disabled: false,
  id: 0
};
const Stylesheet = {
  title: 'Stylesheet',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  id: 1
};
const Overskrifter = {
  title: 'Overskrifter',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  id: 2
};
const ElementSelector = {
  title: 'CSS Element Selector',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  id: 3
};
const Color = {
  title: 'Farge på tekst',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  id: 4
};
const Bilde = {
  title: 'Bilde',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  id: 5
};
const Landingsside1 = {
  title: 'Landingsside 1',
  type: 'course',
  finishedPercent: '0%',
  disabled: false,
  id: 6
};
const Landingsside2 = {
  title: 'Landingsside 2',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  id: 7
};
const Tekst = {
  title: 'Tekst',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  id: 8
};
const Landingsside3 = {
  title: 'Landingsside 3',
  type: 'course',
  finishedPercent: '0%',
  disabled: false,
  id: 9
};
const Gradient = {
  title: 'Gradient',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  id: 10
};
const Landingsside4 = {
  title: 'Landingsside 4',
  type: 'task',
  finishedPercent: '0%',
  disabled: false,
  id: 11
};

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
    showDescriptions: false,
    isSavingNewCourse: false,
    isSavingDescription: false,
    selectedDescription: null,
    descriptions: [],
    newDescription: {
      tagName: '',
      description: '',
      exampleType: 'HTML',
      example: ''
    },
    updatedDescription: {
      tagName: '',
      description: '',
      exampleType: 'HTML',
      example: ''
    },
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
    descriptions: [],
    isLoadingMedia: false,
    authorId: null,
    showPreview: true,
    showConsole: false,
    showEditAssignment: false,
    showAssignment: false,
    tooltip: {
      visible: null,
      timeout: null
    },
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
  },
  techTree: {
    selectedCourse: null,
    courseDependencyList: [],
    courses: [
      Intro,
      Stylesheet,
      Overskrifter,
      ElementSelector,
      Color,
      Bilde,
      Landingsside1,
      Landingsside2,
      Tekst,
      Landingsside3,
      Gradient,
      Landingsside4
    ]
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
