function saveMainAssignment({services, output, state}) {
  const currentTierIndex = state.get(['techTree', 'selectedTierIndex']);
  const currentTierId = state.get(['techTree', 'tiers', currentTierIndex, 'id']);
  const files = state.get(['course', 'scenes', '0', 'sandboxFiles']);
  const userId = state.get(['user', 'id']);

  services.ajax.patch(`/API/mainAssignments/${currentTierId}/${userId}`, {
    files: files,
    authorName: state.get(['mainAssignment', 'authorName']) || state.get(['techTree', 'authorName'])
  })
  .then(() => {
    output.success();
  })
  .catch(() => {
    output.error();
  });
}

export default saveMainAssignment;
