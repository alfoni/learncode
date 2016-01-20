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
    assignmentsSolved: {
      0: [true, true]
    }
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
