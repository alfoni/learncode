import Cerebral from 'cerebral';

let cerebral = Cerebral({
  user: {
    id: '123'
  },
  course: {
    id: '',
    authorId: '123',
    sandbox: [],
    files: [{
      name: 'index.html',
      code: 'bah'
    }],
    code: '', // Not code updates, state to verify need for code change
    currentFileIndex: 0
  }
});

export default cerebral;