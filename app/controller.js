import Controller from 'cerebral';
import Model from 'cerebral-baobab';

const model = Model({
  currentPage: 'recording',
  course: {
    showAddFileInput: false
  }
});

export default Controller(model);
