module.exports = function (files, path) {
  path = path === '/' ? 'index.html' : path.substr(1, path.length);
  return files.filter(function (file) {
    return file.name === path;
  }).pop();
};