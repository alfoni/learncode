function createMainAssignment({services, output, state}) {
  const currentTierIndex = state.get(['techTree', 'selectedTierIndex']);
  const currentTierId = state.get(['techTree', 'tiers', currentTierIndex, 'id']);
  const userId = state.get(['user', 'id']);

  services.ajax.patch(`/API/mainAssignments/${currentTierId}/${userId}`, {
    authorName: state.get(['techTree', 'authorName'])
  })
  .then(() => {
    output.success({
      tierId: currentTierId,
      userId: userId
    });
  })
  .catch(() => {
    output.error();
  });
}

export default createMainAssignment;
