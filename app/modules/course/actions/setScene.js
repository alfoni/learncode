function setScene(input, state, output, services) {
  const currentFileIndex = state.get(['course', 'scenes', input.sceneIndex, 'currentFileIndex']);

  const scene = Object.assign({
    assignment: {
      description: '',
      code: ''
    }
  }, input.scene);
  state.set(['course', 'scenes', input.sceneIndex], scene);
  state.set(['course', 'scenes', input.sceneIndex, 'sandboxFiles'], scene.files);

  if (currentFileIndex) {
    state.set(['course', 'scenes', input.sceneIndex, 'currentFileIndex'], currentFileIndex);
  } else {
    state.set(['course', 'scenes', input.sceneIndex, 'currentFileIndex'], 0);
  }

  if (scene.recording) {
    services.recorder.loadRecording(scene.recording);
  }

  state.set(['course', 'currentSceneIndex'], input.sceneIndex);
}

export default setScene;
