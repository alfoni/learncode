export default {
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
  },
  setFake(courseId, sceneId, assignmentsSolvedCount) {
    return {
      [courseId]: {
        [sceneId]: assignmentsSolvedCount
      }
    };
  }
};
