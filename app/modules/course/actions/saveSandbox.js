function saveSandbox(input, state, output, services) {
  const sandboxFiles = state.get(['course', 'sandboxSnapshot']);
  services.ajax.post('/API/sandbox?id=' + input.requestId, {
    files: sandboxFiles
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
