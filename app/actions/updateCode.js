let updateCode = function(cerebral, event, code) {

  let isOwner = cerebral.get('course', 'authorId') === cerebral.get('user', 'id');
  let isRecording = cerebral.get('recorder', 'isRecording');
  let isPlaying = cerebral.get('recorder', 'isPlaying');
  let currentFileIndex = cerebral.get('course', 'currentFileIndex');

  if (isOwner && !isRecording && !isPlaying) {
    cerebral.set(['course', 'files', currentFileIndex, 'code'], code);
  }

  cerebral.set(['course', 'sandbox', currentFileIndex, 'code'], code);  
  cerebral.set(['course', 'lastEvent'], event);

};

export default updateCode;