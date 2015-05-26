import './styles.less';

import injectTapEventPlugin from 'react-tap-event-plugin';

import React from 'react';
import cerebral from './cerebral.js';
import App from './components/App.js';

injectTapEventPlugin();

cerebral.signal('codeChanged', function logEvents(cerebral, event, code) {
  cerebral.push('events', event);
});

let Wrapper = cerebral.injectInto(App);

React.render(<Wrapper/>, document.querySelector('#app'));
