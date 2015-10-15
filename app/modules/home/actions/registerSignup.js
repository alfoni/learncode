function registerSignup(input, state, output, services) {
  services.ajax.post('/API/registerSignup', {
    email: input.email
  })
  .then(() => {
    output({message: 'Thanks for registering! You will receive a confirmation e-mail shortly.'});
  })
  .catch(() => {
    output({
      message: 'Could not register'
    });
  });
}

export default registerSignup;
