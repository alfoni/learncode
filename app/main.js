import './styles.less';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React from 'react';
import cerebral from './cerebral.js';
import App from './components/App.js';
import api from './utils/api.js';

import saveLatestSandbox from './actions/saveLatestSandbox.js';
import saveSandbox from './actions/saveSandbox.js';
import startRecorderPlayback from './actions/startRecorderPlayback.js';
import stopRecorder from './actions/stopRecorder.js';
import startRecording from './actions/startRecording.js';
import pauseRecorder from './actions/pauseRecorder.js';
import updateSeekPosition from './actions/updateSeekPosition';
import updateCode from './actions/updateCode.js';
import createSandbox from './actions/createSandbox.js';
import toggleFolder from './actions/toggleFolder.js';
import hideMenus from './actions/hideMenus.js';
import showAddFileInput from './actions/showAddFileInput.js';
import updateNewFileName from './actions/updateNewFileName.js';
import addNewFile from './actions/addNewFile.js';
import selectFile from './actions/selectFile.js';
import getCourse from './actions/getCourse.js';
import setLoadingCourse from './actions/setLoadingCourse.js';
import setCourse from './actions/setCourse.js';
import deleteFile from './actions/deleteFile.js';
import resetAddFileInput from './actions/resetAddFileInput.js';
import showBrowser from './actions/showBrowser.js';
import showConsole from './actions/showConsole.js';
import addSandboxLogs from './actions/addSandboxLogs.js';
import toggleExpandLog from './actions/toggleExpandLog.js';
import setClickIndication from './actions/setClickIndication.js';
import toggleShowEditAssignment from './actions/toggleShowEditAssignment.js';
import setAssignmentCode from './actions/setAssignmentCode.js';
import runAssignment from './actions/runAssignment.js';
import showSandboxTestResult from './actions/showSandboxTestResult.js';
import setAssignmentDescription from './actions/setAssignmentDescription.js';
import toggleShowAssignment from './actions/toggleShowAssignment.js';

  // Add recorder signals
cerebral.signal('playClicked', saveLatestSandbox, startRecorderPlayback);
cerebral.signal('stopClicked', stopRecorder);
cerebral.signal('recordClicked', startRecording);
cerebral.signal('pauseClicked', pauseRecorder);
cerebral.signal('recorder.durationUpdated', updateSeekPosition);
cerebral.signal('codeChanged', updateCode);
cerebral.signal('saveClicked', saveSandbox);
cerebral.signal('savePressed', saveSandbox);
cerebral.signal('appMounted', setLoadingCourse, getCourse, setCourse, createSandbox, saveSandbox);
cerebral.signal('folderClicked', toggleFolder);
cerebral.signal('appClicked', setClickIndication, hideMenus, resetAddFileInput);
cerebral.signal('addFileClicked', showAddFileInput, hideMenus);
cerebral.signal('addFileChanged', updateNewFileName);
cerebral.signal('addFileAborted', hideMenus, resetAddFileInput);
cerebral.signal('addFileSubmitted', addNewFile);
cerebral.signal('fileSelected', selectFile);
cerebral.signal('deleteFileClicked', deleteFile);
cerebral.signal('showBrowserClicked', showBrowser);
cerebral.signal('showConsoleClicked', showConsole);
cerebral.signal('sandboxLogged', addSandboxLogs);
cerebral.signal('consoleLogClicked', toggleExpandLog);
cerebral.signal('editAssignmentClicked', toggleShowEditAssignment);
cerebral.signal('assignmentCodeChanged', setAssignmentCode);
cerebral.signal('runAssignmentClicked', runAssignment);
cerebral.signal('sandboxTested', showSandboxTestResult);
cerebral.signal('assignmentDescriptionChanged', setAssignmentDescription);
cerebral.signal('assignmentClicked', toggleShowAssignment);

let Wrapper = cerebral.injectInto(App);

React.render(<Wrapper/>, document.querySelector('#app'));
