function registerSignup({input, output, services}) {
  console.log(services);
  services.http.post('/API/registerSignup', {
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
