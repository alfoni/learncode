import currentScene from './currentScene';

export default function currentFile(get) {
  const scene = get(currentScene);

  if (!scene) {
    return 0;
  }

  return scene.sandboxFiles[scene.currentFileIndex];
}
