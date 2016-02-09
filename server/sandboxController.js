import getSandboxFile from './apis/getSandboxFile.js';
import verifyUser from './verifyUser';

export default function sandboxController(router) {
  router.get('/subdomain/sandbox/*', verifyUser, getSandboxFile);
}
