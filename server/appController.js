import createCourse from './apis/createCourse.js';
import updateCourse from './apis/updateCourse.js';
import getCourse from './apis/getCourse.js';
import getScene from './apis/getScene.js';
import addRecording from './apis/addRecording.js';
import updateSandbox from './apis/updateSandbox.js';
import createScene from './apis/createScene.js';
import updateScene from './apis/updateScene.js';
import saveAudio from './apis/saveAudio.js';
import saveVideo from './apis/saveVideo.js';

export default function appController(router) {
  router.post('/API/courses', createCourse);
  router.patch('/API/courses/:id', updateCourse);
  router.get('/API/courses/:id', getCourse);
  router.get('/API/courses/:id/scenes/:index', getScene);
  router.put('/API/courses/:id/scenes/:index/recording', addRecording);
  router.post('/API/sandbox', updateSandbox);
  router.post('/API/courses/:id/scenes', createScene);
  router.patch('/API/courses/:id/scenes/:index', updateScene);
  router.post('/API/courses/:id/scenes/:index/audio', saveAudio);
  router.post('/API/courses/:id/scenes/:index/video', saveVideo);
}
