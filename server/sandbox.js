let sandbox = {};

export default {
  update(newSandbox) {
    sandbox = newSandbox;
  },
  getFile(path) {
    const fileName = path === '/' ? 'index.html' : path.substr(1, path.length);

    return sandbox.files.filter((file) => file.name === fileName).pop();
  },
  getAssignment() {
    return sandbox.assignment;
  }
};
