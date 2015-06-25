let toggleShowEditAssignment = function (cerebral) {
  cerebral.set(['course', 'assignment', 'showEditor'], !cerebral.get('course', 'assignment', 'showEditor'));
};

export default toggleShowEditAssignment;