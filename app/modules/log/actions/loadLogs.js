function loadLogs(input, state, output, services) {
  services.ajax.get(`/API/logs`)
    .then((users) => {
      console.log(users);
      output.success({
        users: users
      });
    })
    .catch(() => {
      output.error({
        message: 'Kunne ikke hente brukerlogger'
      });
    });
}

export default loadLogs;
