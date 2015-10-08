import getSandboxFile from './apis/getSandboxFile.js';

export default function sandboxController(router) {
  router.get('/sandbox/*', getSandboxFile);
}
