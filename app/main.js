import React from 'react';
import ReactDOM from 'react-dom';
import controller from './controller.js';
import {Container} from 'cerebral-react';
import Router from 'cerebral-router';

import App from './App.js';
import courseSignals from './modules/course/signals.js';

import homeOpened from './modules/home/signals/homeOpened.js';
controller.signal('homeOpened', homeOpened);

courseSignals(controller);

Router(controller, {
  '/': 'homeOpened',
  '/courses/:courseId/scenes/:sceneIndex': 'course.courseOpened'
}, {
  onlyHash: true
}).trigger();

ReactDOM.render(
  <Container controller={controller}>
    <App/>
  </Container>,
document.getElementById('root'));
