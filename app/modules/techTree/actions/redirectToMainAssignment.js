function redirectToSandbox({state, services}) {
  const tierIndex = state.get(['techTree', 'selectedTierIndex']);
  const tierId = state.get(['techTree', 'tiers', tierIndex, 'id']);

  services.router.redirect('/mainassignment/' + tierId);
}

export default redirectToSandbox;
