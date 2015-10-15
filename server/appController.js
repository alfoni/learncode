import getCourse from './apis/getCourse.js';
import getScene from './apis/getScene.js';
import updateSandbox from './apis/updateSandbox.js';
import createScene from './apis/createScene.js';
import registerSignup from './apis/registerSignup.js';

export default function appController(router) {
  router.get('/API/courses/:id', getCourse);
  router.get('/API/courses/:id/scenes/:index', getScene);
  router.post('/API/sandbox', updateSandbox);
  router.post('/API/courses/:id/createScene', createScene);
  router.post('/API/registerSignup', registerSignup);
}
