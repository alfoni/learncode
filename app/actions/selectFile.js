let selectFile = function (cerebral, index) {
  cerebral.set(['course', 'currentFileIndex'], index);
  cerebral.set(['course', 'currentFileName'], cerebral.get('course', 'files', index, 'name'));
  cerebral.set(['course', 'showFolder'], false);
};

export default selectFile;