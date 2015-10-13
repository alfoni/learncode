import {transformCode as transformCode} from 'common/utils.js';

function codeChanged(input, state) {
  const isOwner = state.get(['course', 'authorId']) === state.get(['user', 'id']);
  const isRecording = state.get(['course', 'recorder', 'isRecording']);
  const isPlaying = state.get(['course', 'recorder', 'isPlaying']);
  const currentSceneIndex = state.get(['course', 'currentSceneIndex']);
  const currentFileIndex = state.get(['course', 'scenes', currentSceneIndex, 'currentFileIndex']);

  let code = state.get(['course', 'scenes', currentSceneIndex, 'sandboxFiles', currentFileIndex, 'code']);
  code = transformCode(code, input);

  if (isOwner && !isRecording && !isPlaying) {
    state.set(['course', 'scenes', currentSceneIndex, 'files', currentFileIndex, 'code'], code);
  }

  state.set(['course', 'scenes', currentSceneIndex, 'sandboxFiles', currentFileIndex, 'code'], code);
  state.set(['course', 'lastEvent'], event);
}

export default codeChanged;
