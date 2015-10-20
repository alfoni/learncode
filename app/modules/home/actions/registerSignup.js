function registerSignup(input, state, output, services) {
  services.ajax.post('/API/registerSignup', {
    email: input.email
  })
  .then(() => {
    output.success();
  })
  .catch(() => {
    output.error();
  });
}

export default registerSignup;
