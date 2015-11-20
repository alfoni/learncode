import currentScene from './currentScene';

export default function currentFile(get) {
  const scene = get(currentScene);

  return scene.sandboxFiles[scene.currentFileIndex];
}
