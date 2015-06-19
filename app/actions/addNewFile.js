let addNewFile = function (cerebral) {
  let newFile = {
    code: '',
    name: cerebral.get('course', 'newFileName')
  };
  cerebral.push(['course', 'files'], newFile);
  cerebral.push(['course', 'sandbox'], newFile);
  cerebral.set(['course', 'currentFileIndex'], cerebral.get('course', 'files').length - 1);
  cerebral.set(['course', 'currentFileName'], newFile.name);
  cerebral.set(['course', 'showAddFileInput'], false);
  cerebral.set(['course', 'newFileName'], '');

};

export default addNewFile;