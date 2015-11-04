function loadLogs(input, state, output) {
  fetch(`/API/users/logs`)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error('Could not get course');
    }
  ).then((users) => {
    output.success({
      users: users
    });
  }).catch(() => {
    output.error({
      message: 'Kunne ikke hente brukerlogger'
    });
  });
}

export default loadLogs;
