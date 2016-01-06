function setTooltip({state, input}) {
  state.set(['course', 'tooltip', 'visible'], input.tooltip);
  state.set(['course', 'tooltip', 'timeout'], input.timeout);
}

export default setTooltip;
