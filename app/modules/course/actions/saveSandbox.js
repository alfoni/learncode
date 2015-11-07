function saveSandbox(input, state, output, services) {
  const currentSceneIndex = state.get(['course', 'currentSceneIndex']);
  const assignment = state.get(['course', 'scenes', currentSceneIndex, 'assignment']);
  const sandboxFiles = state.get(['course', 'sandboxSnapshot']);

  services.ajax.post('/API/sandbox?id=' + input.requestId, {
    files: sandboxFiles,
    assignment: assignment
  })
  .then(() => {
    output.success();
  })
  .catch((err) => {
    console.log(err);
    output.error({
      message: 'Could not save sandbox files'
    });
  });
}

export default saveSandbox;
