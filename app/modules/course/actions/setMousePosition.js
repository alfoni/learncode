function setMousePosition(input, state) {
  state.set(['course', 'mousePosition'], {
    x: input.mousePositionX,
    y: input.mousePositionY
  });
}

export default setMousePosition;
