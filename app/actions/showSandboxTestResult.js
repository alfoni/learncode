let showSandboxTestResult = function (cerebral, result) {
  cerebral.set(['course', 'assignment', 'result'], result);
  cerebral.set(['course', 'assignment', 'showAssignment'], true);
};

export default showSandboxTestResult;