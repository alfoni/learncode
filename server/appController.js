import getCourse from './apis/getCourse.js';
import getScene from './apis/getScene.js';
import updateSandbox from './apis/updateSandbox.js';

export default function appController(router) {
  router.get('/API/courses/:id', getCourse);
  router.get('/API/courses/:id/scenes/:index', getScene);
  router.post('/API/sandbox', updateSandbox);
}
