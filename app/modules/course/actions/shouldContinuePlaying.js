function shouldContinuePlaying(input, state, output) {
  if (input.continuePlaying) {
    output.true();
  } else {
    output.false();
  }
}

shouldContinuePlaying.outputs = ['true', 'false'];

export default shouldContinuePlaying;
