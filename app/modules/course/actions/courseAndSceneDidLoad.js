function courseAndSceneDidLoad(input, state, output) {
  if (input.course && input.scene) {
    output.true();
  } else {
    output.false();  
  }
}

courseAndSceneDidLoad.outputs = ['true', 'false'];

export default courseAndSceneDidLoad;
