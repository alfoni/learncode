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
cerebral.signal('appClicked', hideMenus);
cerebral.signal('addFileClicked', showAddFileInput);
cerebral.signal('addFileChanged', updateNewFileName);
cerebral.signal('addFileAborted', hideMenus);
cerebral.signal('addFileSubmitted', addNewFile);
cerebral.signal('fileSelected', selectFile);
cerebral.signal('deleteFileClicked', deleteFile);

let Wrapper = cerebral.injectInto(App);

React.render(<Wrapper/>, document.querySelector('#app'));
