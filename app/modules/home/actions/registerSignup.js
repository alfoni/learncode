function registerSignup({input, output, services}) {
  services.ajax.post('/API/registerSignup', {
    email: input.email
  })
  .then((user) => {
    output.success({
      user: user
    });
  })
  .catch(() => {
    output.error();
  });
}

export default registerSignup;
