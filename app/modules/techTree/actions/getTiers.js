function getTiers({services, output}) {
  services.ajax.get('/API/tiers')
  .then((tiers) => {
    output.success({tiers: tiers});
  })
  .catch((e) => {
    console.log('Could not get tiers', e);
    output.error(e);
  });
}

export default getTiers;
