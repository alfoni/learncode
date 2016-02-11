function createMainAssignment({services, output, state}) {
  const userId = state.get(['user', 'id']);

  services.ajax.patch(`/API/mainAssignments/${userId}`, {
    authorName: state.get(['techTree', 'authorName'])
  })
  .then(() => {
    output.success({
      userId: userId
    });
  })
  .catch(() => {
    output.error();
  });
}

export default createMainAssignment;
