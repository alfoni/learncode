(function (window) {

  window.addEventListener('DOMContentLoaded', function () {

    var test = new Function('%{CODE}%');
    var result = test();

    window.parent.postMessage({
      signal: 'sandboxTested',
      message: result
    }, process.env.NODE_ENV === 'production' ? 'http://www.kodeboksen.no' : 'http://learncode.com:3000');
  });
}(window));
