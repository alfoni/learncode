function saveNewTier({state, services, output}) {
  services.ajax.post('/API/tiers', {
    name: state.get(['techTree', 'newTierName'])
  })
  .then((response) => {
    output.success({tier: response.tier});
  })
  .catch((e) => {
    console.log('Could not create tier', e);
    output.error(e);
  });
}

export default saveNewTier;
