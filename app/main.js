import React from 'react';
import ReactDOM from 'react-dom';
import controller from './controller.js';
import {Container} from 'cerebral-react';
import Router from 'cerebral-router';

import App from './App.js';
import homeOpened from './home/signals/homeOpened.js';
import recordingOpened from './course/signals/recordingOpened.js';

controller.signal('homeOpened', ...homeOpened);
controller.signal('recordingOpened', ...recordingOpened);

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
