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

  // Add recorder signals
cerebral.signal('playClicked', saveLatestSandbox, startRecorderPlayback);
cerebral.signal('stopClicked', stopRecorder);
cerebral.signal('recordClicked', startRecording);
cerebral.signal('pauseClicked', pauseRecorder);
cerebral.signal('recorder.durationUpdated', updateSeekPosition);
cerebral.signal('codeChanged', updateCode);
cerebral.signal('saveClicked', saveSandbox);
cerebral.signal('appMounted', createSandbox, saveSandbox)

let Wrapper = cerebral.injectInto(App);

React.render(<Wrapper/>, document.querySelector('#app'));
