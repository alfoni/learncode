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
import showPreviewClicked from './modules/course/signals/showPreviewClicked.js';
import showConsoleClicked from './modules/course/signals/showConsoleClicked.js';
import folderFileClicked from './modules/course/signals/folderFileClicked.js';
import addFileAborted from './modules/course/signals/addFileAborted.js';
import editAssignmentClicked from './modules/course/signals/editAssignmentClicked.js';
import assignmentCodeChanged from './modules/course/signals/assignmentCodeChanged.js';
import AssignmentDescriptionChanged from './modules/course/signals/AssignmentDescriptionChanged.js';
import addFileSubmitted from './modules/course/signals/addFileSubmitted.js';
import openAssignmentClicked from './modules/course/signals/openAssignmentClicked.js';
import recordClicked from './modules/course/signals/recordClicked.js';
import stopClicked from './modules/course/signals/stopClicked.js';
import playClicked from './modules/course/signals/playClicked.js';
import configureScenesClicked from './modules/course/signals/configureScenesClicked.js';
import addSceneSubmitted from './modules/course/signals/addSceneSubmitted.js';
import sceneNameClicked from './modules/course/signals/sceneNameClicked.js';
import listSceneNameClicked from './modules/course/signals/listSceneNameClicked.js';

controller.signal('homeOpened', homeOpened);
controller.signal('courseOpened', courseOpened);
controller.signal('course.appClicked', courseAppClicked);
controller.signal('course.openFolderClicked', openFolderClicked);
controller.signal('course.addFileClicked', addFileClicked);
controller.signal('course.addFileInputBlurred', addFileInputBlurred);
controller.signal('course.codeChanged', codeChanged);
controller.signal('course.showPreviewClicked', showPreviewClicked);
controller.signal('course.showConsoleClicked', showConsoleClicked);
controller.signal('course.folderFileClicked', folderFileClicked);
controller.signal('course.addFileAborted', addFileAborted);
controller.signal('course.editAssignmentClicked', editAssignmentClicked);
controller.signal('course.assignmentCodeChanged', assignmentCodeChanged);
controller.signal('course.assignmentDescriptionChanged', AssignmentDescriptionChanged);
controller.signal('course.addFileSubmitted', addFileSubmitted);
controller.signal('course.openAssignmentClicked', openAssignmentClicked);
controller.signal('course.addFileSubmitted', addFileSubmitted);
controller.signal('course.openAssignmentClicked', openAssignmentClicked);
controller.signal('course.recordClicked', recordClicked);
controller.signal('course.playClicked', playClicked);
controller.signal('course.stopClicked', stopClicked);
controller.signal('course.configureScenesClicked', configureScenesClicked);
controller.signal('course.addSceneSubmitted', addSceneSubmitted);
controller.signal('course.sceneNameClicked', sceneNameClicked);
controller.signal('course.listSceneNameClicked', listSceneNameClicked);

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
