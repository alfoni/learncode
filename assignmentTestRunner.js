(function (window) {

  window.addEventListener('DOMContentLoaded', function () {

    var test = new Function('%{CODE}%');
    var result = test();

    window.parent.postMessage({
      signal: 'sandboxTested',
      message: result
    }, 'http://learncode.com:3000');
  });
}(window));
