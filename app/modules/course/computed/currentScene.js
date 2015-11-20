export default function currentScene(get) {
  const sceneIndex = get(['course', 'currentSceneIndex']);
  const scenes = get(['course', 'scenes']);

  return scenes[sceneIndex];
}
  
