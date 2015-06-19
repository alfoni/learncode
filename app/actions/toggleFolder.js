let toggleFolder = function (cerebral) {
  cerebral.set(['course', 'showFolder'], !cerebral.get('course', 'showFolder'));
};

export default toggleFolder;