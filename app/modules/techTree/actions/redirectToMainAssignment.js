function redirectToSandbox({state, services}) {
  const tierIndex = state.get(['techTree', 'selectedTierIndex']);
  const tierId = state.get(['techTree', 'tiers', tierIndex, 'id']);
  const userId = state.get(['user', 'id']);

  services.router.redirect('/mainassignment/' + tierId + '/' + userId);
}

export default redirectToSandbox;
