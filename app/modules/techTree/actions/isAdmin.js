function isAdmin({state, output}) {
  if (state.get('user.isAdmin')) {
    output.true();
  } else {
    output.false();
  }
}

isAdmin.outputs = ['true', 'false'];

export default isAdmin;
