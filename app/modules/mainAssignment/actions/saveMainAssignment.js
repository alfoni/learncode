function saveMainAssignment({services, output, state}) {
  const sessionId = state.get(['mainAssignment', 'sessionId']);
  const currentTierIndex = state.get(['techTree', 'selectedTierIndex']);
  const currentTierId = state.get(['techTree', 'tiers', currentTierIndex, 'id']);
  const files = state.get(['course', 'scenes', '0', 'sandboxFiles']);

  services.ajax.patch(`/API/mainAssignments/${currentTierId}/${sessionId}`, {
    files: files,
    authorName: state.get(['techTree', 'authorName'])
  })
  .then(() => {
    output.success();
  })
  .catch(() => {
    output.error();
  });
}

export default saveMainAssignment;
