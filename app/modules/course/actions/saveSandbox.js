function saveSandbox(input, state, output, services) {
  const currentSceneIndex = state.get(['course', 'currentScene']);
  services.ajax.post('/API/sandbox?id=' + input.requestId, {
    files: state.get(['course', 'scenes', currentSceneIndex, 'sandboxFiles'])
  })
  .then(() => {
    output.success();
  })
  .catch(() => {
    output.error({
      message: 'Could not save sandbox files'
    });
  });
}

export default saveSandbox;
