import React from 'react';
import ReactDOM from 'react-dom';
import controller from './controller.js';
import {Container} from 'cerebral-react';
import Router from 'cerebral-router';

import App from './App.js';
import homeOpened from './modules/home/signals/homeOpened.js';
import recordingOpened from './modules/course/signals/recordingOpened.js';
import courseAppClicked from './modules/course/signals/appClicked.js';
import openFolderClicked from './modules/course/signals/openFolderClicked.js';

controller.signal('homeOpened', ...homeOpened);
controller.signal('recordingOpened', ...recordingOpened);
controller.signal('course.appClicked', ...courseAppClicked);
controller.signal('course.openFolderClicked', ...openFolderClicked);

Router(controller, {
  '/': 'homeOpened',
  '/recording': 'recordingOpened'
}, {
  onlyHash: true
}).trigger();

ReactDOM.render(
  <Container controller={controller}>
    <App/>
  </Container>,
document.getElementById('root'));
