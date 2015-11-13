(function (window) {

  window.addEventListener('DOMContentLoaded', function () {

    var test = new Function('%{CODE}%');
    var result = test();

    window.parent.postMessage({
      signal: 'sandboxTested',
      payload: result
    }, location.origin.replace('sandbox', 'www'));
  });
}(window));
