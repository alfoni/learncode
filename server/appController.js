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
import login from './apis/login.js';
import getAudio from './apis/getAudio.js';
import getVideo from './apis/getVideo.js';
import saveLog from './apis/saveLog.js';
import getLogs from './apis/getLogs.js';
import getUser from './apis/getUser.js';
import createSession from './apis/createSession.js';
import trackSession from './apis/trackSession.js';
import getSessions from './apis/getSessions.js';
import getDescriptions from './apis/getDescriptions.js';
import createDescription from './apis/createDescription.js';
import updateDescription from './apis/updateDescription.js';
import deleteDescription from './apis/deleteDescription.js';
import createTier from './apis/createTier.js';
import getTiers from './apis/getTiers.js';
import updateTier from './apis/updateTier.js';
import getCoursesInTier from './apis/getCoursesInTier.js';
import getSandboxCourse from './apis/getSandboxCourse.js';
import updateMainAssignments from './apis/updateMainAssignments.js';
import getMainAssignment from './apis/getMainAssignment.js';
import verifyUser from './verifyUser';

const isAdmin = (req, res, next) => {
  if (req.cookies.kodeboksen === 'christianalfoni@gmail.com') {
    next();
  } else {
    res.status(401);
    res.send({});
  }
};

export default function appController(router) {
  router.get('/API/user', verifyUser, getUser);
  router.post('/API/courses', isAdmin, createCourse);
  router.patch('/API/courses/:id', isAdmin, updateCourse);
  router.get('/API/courses/:id', verifyUser, getCourse);
  router.get('/API/courses', verifyUser, getCourses);
  router.get('/API/courses/:id/scenes/:index', verifyUser, getScene);
  router.put('/API/courses/:id/scenes/:index/recording', isAdmin, addRecording);
  router.post('/API/sandbox', verifyUser, updateSandbox);
  router.get('/API/sandbox/:id', verifyUser, getSandboxCourse);
  router.post('/API/courses/:id/scenes', isAdmin, createScene);
  router.patch('/API/courses/:id/scenes/:index', isAdmin, updateScene);
  router.post('/API/courses/:id/scenes/:index/audio', isAdmin, saveAudio);
  router.post('/API/courses/:id/scenes/:index/video', isAdmin, saveVideo);
  router.get('/API/courses/:id/scenes/:index/audio', verifyUser, getAudio);
  router.get('/API/courses/:id/scenes/:index/video', verifyUser, getVideo);
  router.post('/API/registerSignup', registerSignup);
  router.post('/API/login', login);
  router.post('/API/logs', verifyUser, saveLog);
  router.get('/API/logs', getLogs);
  router.post('/API/sessions', verifyUser, createSession);
  router.get('/API/sessions', isAdmin, getSessions);
  router.post('/API/sessions/:id', verifyUser, trackSession);
  router.get('/API/descriptions', verifyUser, getDescriptions);
  router.post('/API/descriptions', isAdmin, createDescription);
  router.patch('/API/descriptions/:tagName', isAdmin, updateDescription);
  router.delete('/API/descriptions/:tagName', isAdmin, deleteDescription);
  router.post('/API/tiers', isAdmin, createTier);
  router.get('/API/tiers', verifyUser, getTiers);
  router.patch('/API/tiers/:id', isAdmin, updateTier);
  router.get('/API/tiers/:id/courses', verifyUser, getCoursesInTier);
  router.patch('/API/mainAssignments/:userId', verifyUser, updateMainAssignments);
  router.get('/API/mainAssignments/:userId', verifyUser, getMainAssignment);
}
