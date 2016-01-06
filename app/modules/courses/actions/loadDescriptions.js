function loadDescriptions({services, output}) {
  services.ajax.get('/API/descriptions')
  .then((descriptions) => {
    output.success({descriptions: descriptions});
  })
  .catch((err) => {
    output.error({error: err.toString()});
  });
}

export default loadDescriptions;
