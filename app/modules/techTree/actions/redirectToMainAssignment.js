function redirectToSandbox({state, services}) {
  const tierIndex = state.get(['techTree', 'selectedTierIndex']);
  const tierId = state.get(['techTree', 'tiers', tierIndex, 'id']);
  const sessionId = state.get(['session', 'sessionId']);

  services.router.redirect('/mainassignment/' + tierId + '/' + sessionId);
}

export default redirectToSandbox;
