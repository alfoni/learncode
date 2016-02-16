function deleteDescription({services, input, output}) {
  services.http.delete('/api/descriptions/' + input.tagName)
  .then(() => {
    output.success();
  })
  .catch(() => {
    output.error();
  });
}

export default deleteDescription;
