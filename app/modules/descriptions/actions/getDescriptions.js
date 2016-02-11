function getDescriptions({services, output}) {
  services.ajax.get('/API/descriptions')
  .then((descriptions) => {
    output.success({descriptions: descriptions});
  })
  .catch(() => {
    output.error();
  });
}

export default getDescriptions;
