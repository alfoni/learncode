import Cerebral from 'cerebral';

let cerebral = Cerebral({
  user: {
    id: '123'
  },
  course: {},
  isLoadingCourse: true,
  snackbar: {
    show: false,
    message: ''
  }
});

export default cerebral;