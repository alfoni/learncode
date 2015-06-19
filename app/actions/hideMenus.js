let hideMenus = function (cerebral) {
  cerebral.set(['course', 'showFolder'], false);
  cerebral.set(['course', 'showAddFileInput'], false);
};

export default hideMenus;