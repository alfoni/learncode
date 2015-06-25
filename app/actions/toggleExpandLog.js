let toggleExpandLog = function (cerebral, index, path) {
  path = ['course', 'logs', index].concat(path.reduce(function (path, value) {
    return path.concat(['children', value]);
  }, [])).concat('expand');
  cerebral.set(path, !cerebral.get(path));
};

export default toggleExpandLog;