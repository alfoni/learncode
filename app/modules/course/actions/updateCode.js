import {transformCode as transformCode} from 'common/utils.js';

function codeChanged(input, state) {
  const isOwner = state.get(['course', 'authorId']) === state.get(['user', 'id']);
  const isRecording = state.get(['recorder', 'isRecording']);
  const isPlaying = state.get(['recorder', 'isPlaying']);
  const currentFileIndex = state.get(['course', 'currentFile']);

  let code = state.get(['course', 'currentScene', 'sandboxFiles', currentFileIndex, 'code']);
  code = transformCode(code, input);

  if (isOwner && !isRecording && !isPlaying) {
    state.set(['course', 'files', currentFileIndex, 'code'], code);
  }

  state.set(['course', 'sandboxFiles', currentFileIndex, 'code'], code);
  state.set(['course', 'lastEvent'], event);
}

export default codeChanged;
