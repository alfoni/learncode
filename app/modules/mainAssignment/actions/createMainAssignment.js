function createMainAssignment({services, output, state}) {
  const currentTierIndex = state.get(['techTree', 'selectedTierIndex']);
  const currentTierId = state.get(['techTree', 'tiers', currentTierIndex, 'id']);

  services.ajax.patch(`/API/mainAssignments/${currentTierId}`, {
    authorName: state.get(['techTree', 'authorName'])
  })
  .then(() => {
    output.success();
  })
  .catch(() => {
    output.error();
  });
}

export default createMainAssignment;
