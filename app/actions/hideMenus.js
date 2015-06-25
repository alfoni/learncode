let hideMenus = function (cerebral) {
  cerebral.set(['course', 'showFolder'], false);
  cerebral.set(['course', 'assignment', 'showAssignment'], false);
};

export default hideMenus;