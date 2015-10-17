import multer from 'multer';
const upload = multer({dest: 'uploads/'});
const mediaUpload = upload.fields([{
  name: 'audio',
  maxCount: 1
}, {
  name: 'video',
  maxCount: 1
}]);

import getCourse from './apis/getCourse.js';
import getScene from './apis/getScene.js';
import updateSandbox from './apis/updateSandbox.js';
import createScene from './apis/createScene.js';
import registerSignup from './apis/registerSignup.js';
import saveAudioAndVideo from './apis/saveAudioAndVideo.js';

export default function appController(router) {
  router.get('/API/courses/:id', getCourse);
  router.get('/API/courses/:id/scenes/:index', getScene);
  router.post('/API/sandbox', updateSandbox);
  router.post('/API/courses/:id/createScene', createScene);
  router.post('/API/registerSignup', registerSignup);
  router.post('/API/upload', mediaUpload, saveAudioAndVideo);
}
