function setCourse(input, state, output, services) {

  if (input.courseError || input.sceneError) {
    output.error();
  } else {
    state.merge(['course'], input.course);

    const scene = Object.assign({
      assignment: {
        description: '',
        code: ''
      }
    }, input.scene);
    state.set(['course', 'currentSceneIndex'], input.sceneIndex);
    state.set(['course', 'scenes', input.sceneIndex], scene);
    state.set(['course', 'scenes', input.sceneIndex, 'sandboxFiles'], scene.files);
    state.set(['course', 'scenes', input.sceneIndex, 'currentFileIndex'], 0);

    if (scene.recording) {
      services.recorder.loadRecording(scene.recording);
    }

    output.success();
  }
}

export default setCourse;
