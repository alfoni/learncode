function registerSignup(input, state, output, services) {
  services.ajax.post('/API/registerSignup', {
    name: input.name,
    email: input.email,
    number: input.number,
    location: input.location
  })
  .then(() => {
    output.success({message: 'Thanks for registering! You will receive a confirmation e-mail shortly.'});
  })
  .catch(() => {
    output.error({
      message: 'Could not save sandbox files'
    });
  });
}

export default registerSignup;
