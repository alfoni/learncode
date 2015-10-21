function setDefaultCourseState(input, state) {
  state.merge(['course'], {
    name: '',
    isLoading: false,
    authorId: null,
    showPreview: true,
    showConsole: false,
    showEditAssignment: false,
    showAssignment: false,
    showConfigureScenes: false,
    showScenesList: false,
    showFolder: false,
    showAddFileInput: false,
    currentSceneIndex: 0,
    sandboxSnapshot: null,
    recorder: {
      isPlaying: false,
      isUploading: false,
      isRecording: false,
      hasRecorded: false
    },
    scenes: []
  });
}

export default setDefaultCourseState;
