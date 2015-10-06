import React from 'react';
import ReactDOM from 'react-dom';
import controller from './controller.js';
import {Container} from 'cerebral-react';
import Router from 'cerebral-router';

import App from './App.js';
import homeOpened from './modules/home/signals/homeOpened.js';
import courseOpened from './modules/course/signals/courseOpened.js';
import courseAppClicked from './modules/course/signals/appClicked.js';
import openFolderClicked from './modules/course/signals/openFolderClicked.js';
import addFileClicked from './modules/course/signals/addFileClicked.js';
import addFileInputBlurred from './modules/course/signals/addFileInputBlurred.js';
import codeChanged from './modules/course/signals/codeChanged.js';

controller.signal('homeOpened', ...homeOpened);
controller.signal('courseOpened', ...courseOpened);
controller.signal('course.appClicked', ...courseAppClicked);
controller.signal('course.openFolderClicked', ...openFolderClicked);
controller.signal('course.addFileClicked', ...addFileClicked);
controller.signal('course.addFileInputBlurred', ...addFileInputBlurred);
controller.signal('codeChanged', ...codeChanged);

Router(controller, {
  '/': 'homeOpened',
  '/courses/:courseId/scenes/:sceneIndex': 'courseOpened'
}, {
  onlyHash: true
}).trigger();

ReactDOM.render(
  <Container controller={controller}>
    <App/>
  </Container>,
document.getElementById('root'));
