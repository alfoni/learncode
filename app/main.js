import React from 'react';
import ReactDOM from 'react-dom';
import controller from './controller.js';
import {Container} from 'cerebral-view-react';
import Router from 'cerebral-module-router';
import Recorder from 'cerebral-module-recorder';
import Devtools from 'cerebral-module-devtools';

import App from './App.js';

import Home from './modules/home';
import Sessions from './modules/sessions';
import Courses from './modules/courses';
import Course from './modules/course';
import TechTree from './modules/techTree';

import showSnackbar from 'common/factories/actions/showSnackbar.js';
import hideSnackbar from 'common/factories/actions/hideSnackbar.js';

controller.signals({
  snackbarTimedOut: [
    hideSnackbar
  ],
  missingRouteRouted: [
    showSnackbar('Denne url-en finnes ikke')
  ]
});

controller.modules({
  home: Home(),
  sessions: Sessions(),
  courses: Courses(),
  course: Course(),
  techTree: TechTree(),

  recorder: Recorder({
    state: {
      isEnded: false,
      isUploading: false,
      hasUpload: false,
      hasRecorded: false,
      isBuffering: false,
      currentSeek: [0, Date.now()],
      lastPaused: Date.now()
    }
  }),
  devtools: Devtools(),
  router: Router({
    '/': 'home.opened',
    '/courses': 'courses.opened',
    '/courses/:courseId/scenes/:sceneIndex': 'course.opened',
    '/sessions': 'sessions.opened',
    '/techtree': 'techTree.opened',
    '*': 'missingRouteRouted'
  }, {
    onlyHash: true
  })
});

window.BANAN = function () {
  controller.getSignals().home.formSubmitted({
    email: 'christianalfoni@gmail.com'
  });
}

window.EPLE = function () {
  controller.getSignals().home.formSubmitted({
    email: 'tommy.ostgaard@gmail.com'
  });
}

ReactDOM.render(
  <Container controller={controller}>
    <App/>
  </Container>,
document.getElementById('root'));
