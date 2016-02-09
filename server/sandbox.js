const sandboxes = {};

export default {
  update(userId, newSandbox) {
    sandboxes[userId] = newSandbox;
  },
  getFile(userId, path) {
    const fileName = path === '/' ? 'index.html' : path.substr(1, path.length);

    return sandboxes[userId].files.filter((file) => file.name === fileName).pop();
  },
  getAssignment(userId) {
    return sandboxes[userId].assignment;
  }
};
