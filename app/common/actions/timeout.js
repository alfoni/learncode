function timeout(input, state, output) {
  setTimeout(() => {
    output.success();
  }, input.timeout || 2500);
}

export default timeout;
