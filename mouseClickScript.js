(function (window) {

  window.addEventListener('DOMContentLoaded', function () {
    window.document.addEventListener('click', function (e) {
      window.parent.postMessage({
        signal: 'appClicked',
        payload: {
          mousePositionX: e.clientX,
          mousePositionY: e.clientY,
          sandbox: true
        }
      }, location.origin.replace('sandbox', 'www'));
    });
  });
}(window));
