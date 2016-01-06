function setPreviewUrl({state, output}) {
  const requestId = String(Date.now());
  const url = process.env.NODE_ENV === 'production' ? 'https://sandbox.kodeboksen.no' : 'https://sandbox.kodeboksen.dev:3000';
  state.set(['course', 'previewUrl'], url + '?id=' + requestId);
  output({
    requestId: requestId
  });
}

export default setPreviewUrl;
