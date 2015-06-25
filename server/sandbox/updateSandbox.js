module.exports = function (sandbox, assignment) {
  global.sandbox = {
    files: sandbox,
    assignment: assignment
  };
};