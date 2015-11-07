function setPreviewUrl(input, state, output) {
  const requestId = String(Date.now());
  const url = process.env.NODE_ENV === 'production' ? 'http://sandbox.kodeboksen.no' : 'http://sandbox.learncode.com:3000';
  state.set(['course', 'previewUrl'], url + '?id=' + requestId);
  output({
    requestId: requestId
  });
}

export default setPreviewUrl;
