function setPreviewUrl(input, state, output) {
  const requestId = String(Date.now());
  state.set(['course', 'previewUrl'], 'http://sandbox.learncode.com:3000?id=' + requestId);
  output({
    requestId: requestId
  });
}

export default setPreviewUrl;
