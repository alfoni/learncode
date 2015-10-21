function sceneDidLoad(input, state, output) {
  if (input.scene) {
    output.true();
  } else {
    output.false();
  }
}

sceneDidLoad.outputs = ['true', 'false'];

export default sceneDidLoad;
