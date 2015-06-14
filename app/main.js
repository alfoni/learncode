import './styles.less';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React from 'react';
import cerebral from './cerebral.js';
import App from './components/App.js';

    // Add recorder signals
  cerebral.signal('playClicked', function play (cerebral, seek) { 
    cerebral.recorder.play(seek); 
  });
  cerebral.signal('stopClicked', function stop (cerebral) { cerebral.recorder.stop(); });
  cerebral.signal('recordClicked', function record (cerebral) {cerebral.recorder.record(); });
  cerebral.signal('pauseClicked', function pause (cerebral) { 
    // 
    cerebral.recorder.pause(); 
  });
  cerebral.signal('recorder.durationUpdated', function updateDuration (cerebral, currentDuration) { 
    cerebral.set(['recorder', 'currentDuration'], currentDuration);
  });

cerebral.signal('codeChanged', function logEvents(cerebral, event, code) {
  cerebral.set('code', code);
  cerebral.set('lastEvent', event);
});

let Wrapper = cerebral.injectInto(App);

React.render(<Wrapper/>, document.querySelector('#app'));
