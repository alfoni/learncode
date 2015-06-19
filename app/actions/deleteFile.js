let deleteFile = function (cerebral) {
  let currentFileIndex = cerebral.get('course', 'currentFileIndex');
  let isPlaying = cerebral.get('recorder', 'isPlaying');
  let isRecording = cerebral.get('recorder', 'isRecording');
  if (!isPlaying && !isRecording) {
    cerebral.splice(['course', 'files'], currentFileIndex, 1);
  }
  cerebral.splice(['course', 'sandbox'], currentFileIndex, 1);
  cerebral.set(['course', 'currentFileIndex'], currentFileIndex - 1);
  cerebral.set(['course', 'currentFileName'], cerebral.get('course', 'sandbox', currentFileIndex - 1, 'name'));
};

export default deleteFile;