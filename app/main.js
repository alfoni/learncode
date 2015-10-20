import React from 'react';
import ReactDOM from 'react-dom';
import controller from './controller.js';
import {Container} from 'cerebral-react';
import Router from 'cerebral-router';

import App from './App.js';
import homeOpened from './modules/home/signals/homeOpened.js';
import courseSignals from './modules/course/signals.js';
import homeSignals from './modules/home/signals.js';
import coursesSignals from './modules/courses/signals.js';

import showSnackbar from 'common/factories/actions/showSnackbar.js';
import hideSnackbar from 'common/factories/chains/hideSnackbar.js';

controller.signal('homeOpened', homeOpened);
controller.signal('missingRouteRouted', [
  showSnackbar('Denne url-en finnes ikke'),
  ...hideSnackbar(2000)
]);

homeSignals(controller);
courseSignals(controller);
coursesSignals(controller);

Router(controller, {
  '/': 'homeOpened',
  '/courses': 'courses.coursesOpened',
  '/courses/:courseId/scenes/:sceneIndex': 'course.courseOpened',
  '*': 'missingRouteRouted'
}, {
  onlyHash: true
}).trigger();

ReactDOM.render(
  <Container controller={controller}>
    <App/>
  </Container>,
document.getElementById('root'));
