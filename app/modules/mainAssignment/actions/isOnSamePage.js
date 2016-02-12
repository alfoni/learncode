function isOnSamePage({state, output}) {
  const currentPage = state.get('app.currentPage');

  if (currentPage === 'mainAssignment') {
    output.true();
  } else {
    output.false();
  }
}

isOnSamePage.outputs = ['true', 'false'];

export default isOnSamePage;
