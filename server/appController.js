import createCourse from './apis/createCourse.js';
import updateCourse from './apis/updateCourse.js';
import getCourse from './apis/getCourse.js';
import getCourses from './apis/getCourses.js';
import getScene from './apis/getScene.js';
import addRecording from './apis/addRecording.js';
import updateSandbox from './apis/updateSandbox.js';
import createScene from './apis/createScene.js';
import updateScene from './apis/updateScene.js';
import saveAudio from './apis/saveAudio.js';
import saveVideo from './apis/saveVideo.js';
import registerSignup from './apis/registerSignup.js';
import getAudio from './apis/getAudio.js';
import getVideo from './apis/getVideo.js';
import saveUserLog from './apis/saveUserLog.js';
import getUsersLog from './apis/getUsersLog.js';
import getUser from './apis/getUser.js';

export default function appController(router) {
  router.get('/API/user', getUser);
  router.post('/API/courses', createCourse);
  router.patch('/API/courses/:id', updateCourse);
  router.get('/API/courses/:id', getCourse);
  router.get('/API/courses', getCourses);
  router.get('/API/courses/:id/scenes/:index', getScene);
  router.put('/API/courses/:id/scenes/:index/recording', addRecording);
  router.post('/API/sandbox', updateSandbox);
  router.post('/API/courses/:id/scenes', createScene);
  router.patch('/API/courses/:id/scenes/:index', updateScene);
  router.post('/API/courses/:id/scenes/:index/audio', saveAudio);
  router.post('/API/courses/:id/scenes/:index/video', saveVideo);
  router.get('/API/courses/:id/scenes/:index/audio', getAudio);
  router.get('/API/courses/:id/scenes/:index/video', getVideo);
  router.post('/API/registerSignup', registerSignup);
  router.post('/API/users/:userId/log', saveUserLog);
  router.get('/API/users/logs', getUsersLog);
}
