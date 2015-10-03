import Controller from 'cerebral';
import Model from 'cerebral-baobab';

const model = Model({
  currentPage: 'recording'
});

export default Controller(model);
