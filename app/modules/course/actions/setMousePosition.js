function setMousePosition(input, state, output, services) {
  let mousePositionX = input.mousePositionX;
  let mousePositionY = input.mousePositionY;

  if (input.sandbox) { // Click happened in sandbox/preview window
    const iFramePosition = services.getIframePosition();
    mousePositionX += iFramePosition.offsetLeft;
    mousePositionY += iFramePosition.offsetTop;
  }

  state.set(['course', 'mousePosition'], {
    x: mousePositionX,
    y: mousePositionY
  });
}

export default setMousePosition;
