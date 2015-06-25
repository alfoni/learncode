let toggleShowAssignment = function (cerebral) {
  cerebral.set(['course', 'assignment', 'showAssignment'], !cerebral.get('course', 'assignment', 'showAssignment'));
};

export default toggleShowAssignment;