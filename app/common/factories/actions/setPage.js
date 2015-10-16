function setPage(page) {
  function action(input, state) {
    state.set('currentPage', page);
  }

  action.displayName = 'setPage';

  return action;
}

export default setPage;
