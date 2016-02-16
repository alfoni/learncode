function login({state, services, output}) {
  const email = state.get('home.loginForm.email');
  const password = state.get('home.loginForm.password');

  services.ajax.post(`/API/login`, {
    email: email,
    password: password
  })
    .then(() => {
      output.success();
    }).catch(() => {
      output.error();
    });
}

export default login;
