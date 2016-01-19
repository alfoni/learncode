function startRecording({state, services}) {
  state.merge(['recorder'], {
    isRecording: true,
    isEnded: false
  });
  const currentSceneIndex = state.get(['course', 'currentSceneIndex']);
  state.unset(['course', 'scenes', currentSceneIndex, 'duration']);
  state.set(['course', 'scenes', currentSceneIndex, 'recording'], true);
  services.recorder.record({
    paths: [
      ['course', 'showPreview'],
      ['course', 'showConsole'],
      ['course', 'showEditAssignment'],
      ['course', 'showAssignment'],
      ['course', 'tooltip'],
      ['course', 'showConfigureScenes'],
      ['course', 'showScenesList'],
      ['course', 'showFolder'],
      ['course', 'showAddFileInput'],
      ['course', 'currentSceneIndex'],
      ['course', 'currentAssignmentIndex'],
      ['course', 'newFileName'],
      ['course', 'codeSelection'],
      ['course', 'scenes', currentSceneIndex, 'files'],
      ['course', 'scenes', currentSceneIndex, 'currentFileIndex'],
      ['course', 'scenes', currentSceneIndex, 'sandboxFiles']
    ]
  });
}

export default startRecording;
