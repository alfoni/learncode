import Controller from 'cerebral';
import Model from 'cerebral-model-baobab';
import ajax from './services/ajax.js';

const model = Model({
  currentPage: 'course',
  snackbar: {
    show: false,
    text: '',
    persist: false
  },
  user: {
    isLoggedIn: false,
    isLoading: false,
    isAdmin: false,
    forceUser: false,
    assignmentsSolved: {}
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
    getAll() {
      return JSON.parse(localStorage.getItem('assignmentsSolved') || '{}');
    },
    get(courseId, sceneId) {
      const assignments = JSON.parse(localStorage.getItem('assignmentsSolved') || '{}');

      if (assignments[courseId]) {
        return assignments[courseId][sceneId] || {};
      }

      return 0;
    },
    set(courseId, sceneId, assignmentsSolvedCount) {
      const assignments = JSON.parse(localStorage.getItem('assignmentsSolved') || '{}');

      assignments[courseId] = assignments[courseId] || {};
      assignments[courseId][sceneId] = assignmentsSolvedCount;
      localStorage.setItem('assignmentsSolved', JSON.stringify(assignments));

      return assignments;
    }
  }
};

export default Controller(model, services);
