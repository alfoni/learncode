import React from 'react';
import ReactDOM from 'react-dom';
import controller from './controller.js';
import {Container} from 'cerebral-react';
import Router from 'cerebral-router';

import App from './App.js';

import courseSignals from './modules/course/signals.js';
import homeSignals from './modules/home/signals.js';
import coursesSignals from './modules/courses/signals.js';
import sessionsSignals from './modules/sessions/signals.js';
import techTreeSignals from './modules/techTree/signals.js';

import showSnackbar from 'common/factories/actions/showSnackbar.js';
import hideSnackbar from 'common/factories/actions/hideSnackbar.js';

controller.signal('snackbarTimedOut', [
  hideSnackbar
]);
controller.signal('missingRouteRouted', [
  showSnackbar('Denne url-en finnes ikke')
]);

homeSignals(controller);
courseSignals(controller);
coursesSignals(controller);
sessionsSignals(controller);
techTreeSignals(controller);

Router(controller, {
  '/': 'homeOpened',
  '/courses': 'courses.coursesOpened',
  '/courses/:courseId/scenes/:sceneIndex': 'course.courseOpened',
  '/sessions': 'sessions.sessionsOpened',
  '/techtree': 'techTree.techTreeOpened',
  '*': 'missingRouteRouted'
}, {
  onlyHash: true
});

ReactDOM.render(
  <Container controller={controller}>
    <App/>
  </Container>,
document.getElementById('root'));
