function trackData(name) {
  function getUser(input, state, output) {
    output.success({user: 'tommy.ostgaard@gmail.com'});
  }

  getUser.displayName = 'getUser';

  function saveData(input, state, output, services) {
    services.ajax.post(`/API/users/${input.user}/log`, {
      message: name,
      timestamp: new Date()
    })
    .then(() => {
      output();
    })
    .catch(() => {
      output();
    });
  }

  saveData.displayName = 'saveData';

  return [
    [
      getUser, {
        success: [
          [saveData]
        ]
      }
    ]
  ];
}

export default trackData;
